import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DeudorService } from './deudor.service';
import { UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { DeudorEntity } from './deudor.entity';
import { DeudorDto } from './deudor.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/user/role.enum';
import { LocalAuthGuard } from 'src/auth/guards/local-auth/local-auth.guard';

@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, LocalAuthGuard)
@Controller('deudor')
export class DeudorController {
    constructor(private readonly deudorService: DeudorService) { }

    @Get()
    @Roles(Role.PRESTAMISTA, Role.ADMIN)
    async findAll() {
        return await this.deudorService.findAll();
    }

    @Get(':deudorId')
    @Roles(Role.PRESTAMISTA, Role.ADMIN)
    async findOne(@Param('deudorId') deudorId: string) {
        return await this.deudorService.findOne(deudorId);
    }

    @Post()
    @Roles(Role.PRESTAMISTA, Role.ADMIN)
    async create(@Body() deudorDto: DeudorDto) {
        const deudor: DeudorEntity = plainToInstance(DeudorEntity, deudorDto);
        return await this.deudorService.create(deudor);
    }

    @Put(':deudorId')
    @Roles(Role.PRESTAMISTA, Role.ADMIN)
    async update(@Param('deudorId') deudorId: string, @Body() deudorDto: DeudorDto) {
        const deudor: DeudorEntity = plainToInstance(DeudorEntity, deudorDto);
        return await this.deudorService.update(deudorId, deudor);
    }

    @Delete(':deudorId')
    @Roles(Role.PRESTAMISTA, Role.ADMIN)
    @HttpCode(204)
    async delete(@Param('deudorId') deudorId: string) {
        return await this.deudorService.delete(deudorId);
    }
}
