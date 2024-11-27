import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseInterceptors,
    UseGuards
  } from '@nestjs/common';
  import { plainToInstance } from 'class-transformer';
  import { PrestamoEntity } from 'src/prestamo/prestamo.entity';
  import { PrestamoDto } from '../prestamo/prestamo.dto';
  import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
  import { PrestamistaPrestamoService } from './prestamista-prestamo.service';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
  import { Roles } from '../user/roles.decorator';
  import { Role } from '../user/role.enum';
  
  @Controller('prestamistas')
  @UseInterceptors(BusinessErrorsInterceptor)
  export class PrestamistaPrestamoController {
    constructor(private readonly prestamistaPrestamoService: PrestamistaPrestamoService) {}
  
    @Post(':prestamistaId/prestamos/:prestamoId')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.PRESTAMISTA, Role.ADMIN)
    async addPrestamoToPrestamista(
      @Param('prestamistaId') prestamistaId: string,
      @Param('prestamoId') prestamoId: string,
    ) {
      return await this.prestamistaPrestamoService.addPrestamoPrestamista(
        prestamistaId,
        prestamoId,
      );
    }
  
    @Get(':prestamistaId/prestamos/:prestamoId')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.PRESTAMISTA, Role.ADMIN, Role.DEUDOR)
    async findPrestamoByPrestamistaIdPrestamoId(
      @Param('prestamistaId') prestamistaId: string,
      @Param('prestamoId') prestamoId: string,
    ) {
      return await this.prestamistaPrestamoService.findPrestamoByPrestamistaIdPrestamoId(
        prestamistaId,
        prestamoId,
      );
    }
  
    @Get(':prestamistaId/prestamos')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.PRESTAMISTA, Role.ADMIN, Role.DEUDOR)
    async findPrestamosByPrestamistaId(@Param('prestamistaId') prestamistaId: string) {
      return await this.prestamistaPrestamoService.findPrestamosByPrestamistaId(
        prestamistaId,
      );
    }
  
    @Put(':prestamistaId/prestamos')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.PRESTAMISTA, Role.ADMIN)
    async associatePrestamosToPrestamista(
      @Body() prestamosDto: PrestamoDto[],
      @Param('prestamistaId') prestamistaId: string,
    ) {
      const prestamos = plainToInstance(PrestamoEntity, prestamosDto);
      return await this.prestamistaPrestamoService.associatePrestamosPrestamista(
        prestamistaId,
        prestamos,
      );
    }
  
    @Delete(':prestamistaId/prestamos/:prestamoId')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.PRESTAMISTA, Role.ADMIN)
    @HttpCode(204)
    async deletePrestamoFromPrestamista(
      @Param('prestamistaId') prestamistaId: string,
      @Param('prestamoId') prestamoId: string,
    ) {
      return await this.prestamistaPrestamoService.deletePrestamoPrestamista(
        prestamistaId,
        prestamoId,
      );
    }
  }
  