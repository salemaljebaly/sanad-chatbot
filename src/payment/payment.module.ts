import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({})
export class PaymentModule {
  /**
   * We have stripe's api-key as an env var, so we use factory functions
   * Also using the forRootAsync convention because it loads the api-key asynchronously
   */
  static forRootAsync(): DynamicModule {
    return {
      module: PaymentModule,
      controllers: [PaymentController],
      imports: [ConfigModule.forRoot()],
      providers: [
        PaymentService,
        {
          provide: 'STRIPE_SECRET_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_SECRET_KEY'),
          inject: [ConfigService],
        },
      ],
    };
  }
}
