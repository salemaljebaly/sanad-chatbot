import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EsimService } from './esim.service';
import { ApiTags } from '@nestjs/swagger';
import { EsimDTO } from './dto/esim.dto';

@ApiTags('eSIM')
@Controller('esim')
export class EsimController {
  constructor(private readonly esimService: EsimService) {}

  // Only this one works right now
  @Post('get-all-data-packages')
  getAllDataPackages(@Body() dto: EsimDTO) {
    return this.esimService.getAllDataPackages(dto);
  }

  @Post('order')
  orderEsim(@Body() body: { planId: string; email: string }) {
    return this.esimService.orderEsim(body.planId, body.email);
  }

  @Post('order/:orderId')
  getOrderStatus(@Param('orderId') orderId: string) {
    return this.esimService.getOrderStatus(orderId);
  }
}
