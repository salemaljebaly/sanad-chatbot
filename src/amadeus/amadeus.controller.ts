import { Controller, Get, Query, Logger } from '@nestjs/common';
import { AmadeusService } from './amadeus.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FlightSearchDto } from './dto/flight-search.dto';

@ApiTags('Flight Search')
@Controller('amadeus')
export class AmadeusController {
  private readonly logger = new Logger(AmadeusController.name);

  constructor(private readonly amadeusService: AmadeusService) {}

  @Get('flight-offers')
  @ApiOperation({ summary: 'Search available flight offers' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved flight offers' })
  @ApiResponse({ status: 400, description: 'Invalid input parameters' })
  async searchFlightOffers(@Query() query: FlightSearchDto) {
    this.logger.log(`Searching flights from ${query.originLocationCode} to ${query.destinationLocationCode}`);

    try {
      const result = await this.amadeusService.searchFlightOffers(query);
      return result;
    } catch (error) {
      this.logger.error('Error searching flight offers', error);
      throw error;
    }
  }
}