/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PagoEntity } from 'src/pago/pago.entity';
import { PagoDto } from '../pago/pago.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PrestamoPagoService } from './prestamo-pago.service';

@Controller('prestamos')
@UseInterceptors(BusinessErrorsInterceptor)
export class PrestamoPagoController {
    constructor(private readonly prestamoPagoService: PrestamoPagoService){}

    @Post(':prestamoId/pagos/:pagoId')
    async addPagoPrestamo(@Param('prestamoId') prestamoId: string, @Param('pagoId') pagoId: string){
        return await this.prestamoPagoService.addPagoPrestamo(prestamoId, pagoId);
    }

    @Delete(':prestamoId/pagos/:pagoId')
    @HttpCode(204)
    async deletePagoPrestamo(@Param('prestamoId') prestamoId: string, @Param('pagoId') pagoId: string){
        return await this.prestamoPagoService.deletePagoPrestamo(prestamoId, pagoId);
    }
}
