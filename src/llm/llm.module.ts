import { Module } from '@nestjs/common';
import { LLMService } from './llm.service';
import { UserContextService } from 'src/user-context/user-context.service';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { HttpModule } from '@nestjs/axios';
import { PaymentService } from 'src/payment/payment.service';
import { LLMController } from './llm.controller';

@Module({
  imports: [HttpModule],
  controllers: [LLMController],
  providers: [
    LLMService,
    UserContextService,
    AmadeusService,
    PaymentService,
  ],
})
export class LLMModule {}
