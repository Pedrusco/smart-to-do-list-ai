import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { GenerateAiDto } from './dto/generate-ai.dto';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @ApiOperation({ summary: 'Generate tasks using AI' })
  @ApiBody({ type: GenerateAiDto })
  @Post('generate')
  async generate(@Body() body: GenerateAiDto) {
    return this.aiService.generateTasks(body.prompt);
  }
}
