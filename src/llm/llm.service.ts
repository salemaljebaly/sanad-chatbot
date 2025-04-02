import { Injectable, Logger } from '@nestjs/common';
import { UserContextService } from 'src/user-context/user-context.service';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { processFunctionCall } from './llm.function-calls';
import { initiateChat } from './llm.chat';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class LLMService {
  private readonly genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  private readonly logger = new Logger(LLMService.name);

  constructor(
    private readonly context: UserContextService,
    private readonly amadeus: AmadeusService,
    private readonly stripeService: PaymentService,
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
        this.stripeService,
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
