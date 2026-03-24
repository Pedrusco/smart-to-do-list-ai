import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Buy groceries',
    description: 'Title of the task',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
