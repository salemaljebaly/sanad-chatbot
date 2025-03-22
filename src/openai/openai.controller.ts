import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';
// import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { GenerateResponseDto } from './dto/generate-response.dto';

// @ApiTags('OpenAI')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('generate-response')
  // @ApiBody({
  //   description: 'Generate AI response based on user input',
  //   type: GenerateResponseDto,
  // })
  // @ApiResponse({ status: 200, description: 'AI response generated successfully.' })
  // @ApiResponse({ status: 400, description: 'Invalid input.' })
  // @ApiResponse({ status: 500, description: 'Internal server error.' })
  async generateResponse(@Body() generateResponseDto: GenerateResponseDto) {
    return await this.openaiService.generateAIResponse(
      generateResponseDto.userId,
      generateResponseDto.userInput,
    );
  }
}
