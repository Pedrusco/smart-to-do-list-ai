import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateAiDto {
  @ApiProperty({
    example: 'Plan a trip to Japan',
    description: 'High-level goal to generate tasks from',
  })
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
