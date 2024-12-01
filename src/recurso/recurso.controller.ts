import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { RecursoService } from './recurso.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RecursoDto } from './recurso.dto';
import { RecursoEntity } from './recurso.entity';
import { plainToInstance } from 'class-transformer';

@Controller('recursos')
@UseInterceptors(BusinessErrorsInterceptor)
export class RecursoController {
    constructor(
        private readonly recursoService: RecursoService,
    ) {}

    @Get()
    async findAll() 
    {
        return await this.recursoService.findAll();
    }

    @Get(':recursoId')
    async findOne(@Param('recursoId') recursoId: string)
    {
        return await this.recursoService.findOne(recursoId);
    }

    @Post()
    async create(@Body()recursoDto: RecursoDto)
    {
        const recurso : RecursoEntity = plainToInstance(RecursoEntity, recursoDto)
        return await this.recursoService.create(recurso);
    }

    @Put(':recursoId')
    async update(@Param('recursoId') recursoId: string, @Body() recursoDto: RecursoDto)
    {
        const recurso : RecursoEntity = plainToInstance(RecursoEntity, recursoDto)
        return this.recursoService.update(recursoId, recurso);
    }

    @Delete('recurso/:recursoId')
    @HttpCode(204)
    async delete(@Param('recursoId') recursoId: string)
    {
        return await this.recursoService.delete(recursoId);
    }
}
