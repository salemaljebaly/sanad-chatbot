import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateCheckoutSessionDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async sessionStatus(sessionId: string): Promise<any> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);

    return {
      status: session.status,
      customer_email: session.customer_details.email,
    };
  }

  async createCheckoutSession(
    createCheckoutSessionDto: CreateCheckoutSessionDto,
    successUrl: string,
    cancelUrl: string,
  ): Promise<Stripe.Checkout.Session> {
    const { items, currency } = createCheckoutSessionDto;
    // Convert items into Stripe-compatible lineItems format
    const lineItems = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity || 1,
    }));

    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card', 'alipay'],
      ui_mode: 'hosted',
      line_items: lineItems,
      mode: 'payment',
      currency: currency,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  }
}
