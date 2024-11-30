import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors  } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PagoDto } from './pago.dto';
import { PagoEntity } from './pago.entity';
import { PagoService } from './pago.service';

@Controller('pagos')
@UseInterceptors(BusinessErrorsInterceptor)
export class PagoController {

    constructor(private readonly pagoService: PagoService) {}

    @Post()
    async create(@Body() pagoDto: PagoDto) {
        const pago: PagoEntity = plainToInstance(PagoEntity, pagoDto);
        return await this.pagoService.create(pago);
    }

    @Delete(':pagoId')
    @HttpCode(204)
    async delete(@Param('pagoId') pagoId: string) {
      return await this.pagoService.delete(pagoId);
    }


}
