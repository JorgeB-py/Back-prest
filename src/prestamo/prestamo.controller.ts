import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PrestamoEntity } from './prestamo.entity';
import { PrestamoDto } from './prestamo.dto';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('prestamo')
export class PrestamoController {
    constructor(private readonly prestamoService: PrestamoService) { }
    @Get()
    async findAll() {
        return await this.prestamoService.findAll();
    }

    @Get(':prestamoId')
    async findOne(@Param('prestamoId') prestamoId: string) {
        return await this.prestamoService.findOne(prestamoId);
    }

    @Post()
    async create(@Body() prestamoDto: PrestamoDto) {
        const prestamo: PrestamoEntity = plainToInstance(PrestamoEntity, prestamoDto);
        return await this.prestamoService.create(prestamo);
    }

    @Put(':prestamoId')
    async update(@Param('prestamoId') prestamoId: string, @Body() prestamoDto: PrestamoDto) {
        const prestamo: PrestamoEntity = plainToInstance(PrestamoEntity, prestamoDto);
        return await this.prestamoService.update(prestamoId, prestamo);
    }

    @Delete(':prestamoId')
    @HttpCode(204)
    async delete(@Param('prestamoId') prestamoId: string) {
        return await this.prestamoService.delete(prestamoId);
    }
}
