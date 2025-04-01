import { IsString } from 'class-validator';

export class GenerateResponseDto {
  @IsString()
  userId: string;

  @IsString()
  userInput: string;
}
