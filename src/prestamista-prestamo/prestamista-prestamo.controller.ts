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
  } from '@nestjs/common';
  import { plainToInstance } from 'class-transformer';
  import { PrestamoEntity } from 'src/prestamo/prestamo.entity';
  import { PrestamoDto } from '../prestamo/prestamo.dto';
  import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
  import { PrestamistaPrestamoService } from './prestamista-prestamo.service';
  
  @Controller('prestamistas')
  @UseInterceptors(BusinessErrorsInterceptor)
  export class PrestamistaPrestamoController {
    constructor(private readonly prestamistaPrestamoService: PrestamistaPrestamoService) {}
  
    @Post(':prestamistaId/prestamos/:prestamoId')
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
    async findPrestamosByPrestamistaId(@Param('prestamistaId') prestamistaId: string) {
      return await this.prestamistaPrestamoService.findPrestamosByPrestamistaId(
        prestamistaId,
      );
    }
  
    @Put(':prestamistaId/prestamos')
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
  