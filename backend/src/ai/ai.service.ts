import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { PrismaService } from '../prisma/prisma.service';
import type { AITask } from './types/ai-task-type';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generateTasks(prompt: string): Promise<AITask[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a task planner. Break down goals into actionable tasks.',
          },
          {
            role: 'user',
            content: `
              Return ONLY a JSON array in this format:
              [
                { "title": "Task 1" },
                { "title": "Task 2" }
              ]

              Goal: ${prompt}
            `,
          },
        ],
      });

      const content = response.choices[0]?.message?.content;

      if (!content) {
        throw new InternalServerErrorException('Empty response from AI');
      }

      let parsed: AITask[];

      try {
        parsed = JSON.parse(content) as AITask[];
      } catch {
        throw new InternalServerErrorException('Invalid AI response format');
      }

      if (!Array.isArray(parsed)) {
        throw new InternalServerErrorException(
          'AI response is not a valid array',
        );
      }

      const createdTasks = await Promise.all(
        parsed.map((task) =>
          this.prisma.task.create({
            data: {
              title: task.title,
              isAI: true,
            },
          }),
        ),
      );

      return createdTasks;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('AI generation failed');
    }
  }
}
