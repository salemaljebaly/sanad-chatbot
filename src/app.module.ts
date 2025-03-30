import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';
import { UserContextModule } from './user-context/user-context.module';
import { AmadeusModule } from './amadeus/amadeus.module';
import { PaymentModule } from './payment/payment.module';
import { StripeWebhookModule } from './payment/webhook/webhook.module';
import { EsimModule } from './esim/esim.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PaymentModule.forRootAsync(),
    WhatsappModule,
    OpenaiModule,
    UserContextModule,
    AmadeusModule,
    StripeWebhookModule,
    EsimModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
