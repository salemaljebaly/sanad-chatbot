import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { UserContextService } from 'src/user-context/user-context.service';
import { AmadeusService } from 'src/amadeus/amadeus.service';
import { HttpModule } from '@nestjs/axios';
import { OpenaiController } from './openai.controller';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  imports: [HttpModule],
  controllers: [OpenaiController],
  providers: [
    OpenaiService,
    UserContextService,
    AmadeusService,
    PaymentService,
  ],
})
export class OpenaiModule {}
