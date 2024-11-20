import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { DeudorService } from './deudor.service';
import { UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { DeudorEntity } from './deudor.entity';
import { DeudorDto } from './deudor.dto';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('deudor')
export class DeudorController {
    constructor(private readonly deudorService: DeudorService) { }
    @Get()
    async findAll() {
        return await this.deudorService.findAll();
    }

    @Get(':deudorId')
    async findOne(@Param('deudorId') deudorId: string) {
        return await this.deudorService.findOne(deudorId);
    }

    @Post()
    async create(@Body() deudorDto: DeudorDto) {
        const deudor: DeudorEntity = plainToInstance(DeudorEntity, deudorDto);
        return await this.deudorService.create(deudor);
    }

    @Put(':deudorId')
    async update(@Param('deudorId') deudorId: string, @Body() deudorDto: DeudorDto) {
        const deudor: DeudorEntity = plainToInstance(DeudorEntity, deudorDto);
        return await this.deudorService.update(deudorId, deudor);
    }

    @Delete(':deudorId')
    @HttpCode(204)
    async delete(@Param('deudorId') deudorId: string) {
        return await this.deudorService.delete(deudorId);
    }
}
