import { Module } from '@nestjs/common';
import { EsimService } from './esim.service';
import { EsimController } from './esim.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [EsimController],
  providers: [EsimService],
})
export class EsimModule {}
