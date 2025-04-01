// webhook.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeWebhookService {
  async processWebhookEvent(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Checkout completed:', session.id);
        await this.notifyUser(
          session.customer_email,
          'Your payment was successful! 🎉',
        );
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('✅ Payment Intent Succeeded:', paymentIntent.id);
        await this.notifyUser(
          paymentIntent.receipt_email,
          'Your payment was received. Thank you!',
        );
        break;

      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('❌ Payment Failed:', failedPaymentIntent.id);
        await this.notifyUser(
          failedPaymentIntent.receipt_email,
          'Your payment failed. Please try again.',
        );
        break;

      case 'charge.refunded':
        const refundedCharge = event.data.object as Stripe.Charge;
        console.log('💰 Payment Refunded:', refundedCharge.id);
        await this.notifyUser(
          refundedCharge.billing_details.email,
          'Your payment has been refunded.',
        );
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        console.log('✅ Subscription Payment Succeeded:', invoice.id);
        await this.notifyUser(
          invoice.customer_email,
          'Your subscription payment was successful.',
        );
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log('❌ Subscription Payment Failed:', failedInvoice.id);
        await this.notifyUser(
          failedInvoice.customer_email,
          'Your subscription payment failed. Please update your payment details.',
        );
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        console.log('⏳ Checkout Session Expired:', expiredSession.id);
        await this.notifyUser(
          expiredSession.customer_email,
          'Your checkout session expired. Please try again.',
        );
        break;

      default:
        console.warn(`⚠️ Unhandled event type: ${event.type}`);
    }
  }

  async notifyUser(email: string, message: string) {
    console.log(`📧 Sending email to ${email}: ${message}`);
    // Implement actual notification logic (e.g., email, WhatsApp, etc.)
  }
}
