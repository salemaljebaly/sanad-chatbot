import { Injectable, Logger } from '@nestjs/common';
import { UserContextService } from 'src/user-context/user-context.service';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { processFunctionCall } from './openai.function-calls';
import { initiateChat } from './openai.chat';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class OpenaiService {
  private readonly genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  private readonly logger = new Logger(OpenaiService.name);

  constructor(
    private readonly context: UserContextService,
    private readonly amadeus: AmadeusService,
  ) {}

  async generateAIResponse(userID: string, userInput: string) {
    try {
      if (!userInput || userInput.trim() === '') {
        this.logger.warn('Empty user input received.');
        return 'Please provide some input to get started.';
      }

      const userContext = await this.context.saveAndFetchContext(
        userInput,
        'user',
        userID,
      );
      const chat = initiateChat(this.genAI, userContext);

      const result = await chat.sendMessage(userInput);
      const response = result.response;

      const aiResponse = await processFunctionCall(
        chat,
        response,
        this.amadeus,
        this.logger,
      );

      await this.context.saveToContext(aiResponse, 'assistant', userID);
      return aiResponse;
    } catch (error) {
      this.logger.error('Error generating AI response', error);
      return 'Sorry, I am unable to process your request at the moment. Please try again later.';
    }
  }
}
