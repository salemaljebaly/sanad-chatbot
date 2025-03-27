import { Module } from '@nestjs/common';
import { StripeWebhookController } from './webhook.controller';
import { StripeWebhookService } from './webhook.service';

@Module({
  controllers: [StripeWebhookController],
  providers: [StripeWebhookService],
  exports: [StripeWebhookService],
})
export class StripeWebhookModule {}
