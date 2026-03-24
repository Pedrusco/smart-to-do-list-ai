import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const mockPrisma = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a task', async () => {
    mockPrisma.task.create.mockResolvedValue({
      id: '1',
      title: 'Test',
      isCompleted: false,
    });

    const result = await service.create('Test');

    expect(result.title).toBe('Test');
    expect(mockPrisma.task.create).toHaveBeenCalled();
  });

  it('should return all tasks', async () => {
    mockPrisma.task.findMany.mockResolvedValue([{ id: '1', title: 'Task 1' }]);

    const result = await service.findAll();

    expect(result).toHaveLength(1);
  });

  it('should update a task', async () => {
    mockPrisma.task.update.mockResolvedValue({
      id: '1',
      isCompleted: true,
    });

    const result = await service.update('1', true);

    expect(result.isCompleted).toBe(true);
  });

  it('should throw NotFoundException when updating non-existing task', async () => {
    const prismaError = new PrismaClientKnownRequestError('Record not found', {
      code: 'P2025',
      clientVersion: '6.0.0',
    });

    mockPrisma.task.update.mockRejectedValue(prismaError);

    await expect(service.update('999', true)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete a task', async () => {
    mockPrisma.task.delete.mockResolvedValue({ id: '1' });

    const result = await service.delete('1');

    expect(result!.id).toBe('1');
  });

  it('should throw NotFoundException when deleting non-existing task', async () => {
    const prismaError = new PrismaClientKnownRequestError('Record not found', {
      code: 'P2025',
      clientVersion: '6.0.0',
    });

    mockPrisma.task.delete.mockRejectedValue(prismaError);

    await expect(service.delete('999')).rejects.toThrow(NotFoundException);
  });
});
