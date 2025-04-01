import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCheckoutSessionDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/session-status')
  async sessionStatus(@Query('session_id') sessionId) {
    return this.paymentService.sessionStatus(sessionId);
  }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    const session = await this.paymentService.createCheckoutSession(
      createCheckoutSessionDto,
      'http://localhost:3000/api',
      'https://yourdomain.com/cancel',
    );

    return { id: session.id, url: session.url };
  }
}
