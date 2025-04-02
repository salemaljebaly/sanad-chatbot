import { Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { LLMService } from 'src/llm/llm.service';
import { UserContextService } from '../user-context/user-context.service';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { HttpModule } from '@nestjs/axios';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  imports: [HttpModule],
  controllers: [WhatsappController],
  providers: [
    LLMService,
    WhatsappService,
    UserContextService,
    AmadeusService,
    PaymentService,
  ],
})
export class WhatsappModule {}
