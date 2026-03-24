import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    example: true,
    description: 'Mark task as completed or not',
  })
  @IsBoolean()
  isCompleted: boolean;
}
