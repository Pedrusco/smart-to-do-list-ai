import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(title: string) {
    return await this.prisma.task.create({
      data: {
        title,
      },
    });
  }

  async findAll() {
    return await this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, isCompleted: boolean) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data: { isCompleted },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Task not found.');
        }
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Task not found.');
        }
      }
    }
  }
}
