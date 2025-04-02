import {
  Controller,
  Post,
  Req,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { StripeWebhookService } from './webhook.service';
import Stripe from 'stripe';

@Controller('stripe-webhook')
export class StripeWebhookController {
  private stripe: Stripe;

  constructor(private readonly webhookService: StripeWebhookService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY,);
  }

  @Post()
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const payload = req.body;
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret,
      );
      console.log('Received event:', event.type);
    } catch (err) {
      throw new HttpException(
        `Webhook signature verification failed: ${err.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.webhookService.processWebhookEvent(event);
    return { received: true };
  }
}
