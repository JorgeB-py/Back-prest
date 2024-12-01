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

    @Get(':prestamoId/pagos/:pagoId')
    async findPagoByPrestamoIdPagoId(@Param('prestamoId') prestamoId: string, @Param('pagoId') pagoId: string){
        return await this.prestamoPagoService.findPagoByPrestamoIdPagoId(prestamoId, pagoId);
    }

    @Get(':prestamoId/pagos')
    async findPagosByPrestamoId(@Param('prestamoId') prestamoId: string){
        return await this.prestamoPagoService.findPagosByPrestamoId(prestamoId);
    }

    @Put(':prestamoId/pagos')
    async associatePagosPrestamo(@Body() pagosDto: PagoDto[], @Param('prestamoId') prestamoId: string){
        const pagos = plainToInstance(PagoEntity, pagosDto)
        return await this.prestamoPagoService.associatePagosPrestamo(prestamoId, pagos);
    }
    
    @Delete(':prestamoId/pagos/:pagoId')
    @HttpCode(204)
    async deletePagoPrestamo(@Param('prestamoId') prestamoId: string, @Param('pagoId') pagoId: string){
        return await this.prestamoPagoService.deletePagoPrestamo(prestamoId, pagoId);
    }
}
