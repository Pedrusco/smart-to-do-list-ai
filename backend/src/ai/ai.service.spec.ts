import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;

  const mockPrisma = {
    task: {
      create: jest.fn(),
    },
  };

  const mockOpenAI = {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);

    // openai mock
    (service as unknown as { openai: typeof mockOpenAI }).openai = mockOpenAI;
  });

  it('should generate and save tasks', async () => {
    mockOpenAI.chat.completions.create.mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify([{ title: 'Task 1' }, { title: 'Task 2' }]),
          },
        },
      ],
    });

    mockPrisma.task.create.mockResolvedValue({ id: '1' });

    const result = await service.generateTasks('Test');

    expect(result.length).toBe(2);
    expect(mockPrisma.task.create).toHaveBeenCalled();
  });
});
