import { Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { OpenaiService } from 'src/openai/openai.service';
import { UserContextService } from '../user-context/user-context.service';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { HttpModule } from '@nestjs/axios';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  imports: [HttpModule],
  controllers: [WhatsappController],
  providers: [
    OpenaiService,
    WhatsappService,
    UserContextService,
    AmadeusService,
    PaymentService,
  ],
})
export class WhatsappModule {}
