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
  import { RecursoEntity } from 'src/recurso/recurso.entity';
  import { RecursoDto } from '../recurso/recurso.dto';
  import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
  import { PrestamistaRecursoService } from './prestamista-recurso.service';
  
  @Controller('prestamistas')
  @UseInterceptors(BusinessErrorsInterceptor)
  export class PrestamistaRecursoController {
    constructor(private readonly prestamistaRecursoService: PrestamistaRecursoService) {}
  
    @Post(':prestamistaId/recursos/:recursoId')
    async addRecursoPrestamista(
      @Param('prestamistaId') prestamistaId: string,
      @Param('recursoId') recursoId: string,
    ) {
      return await this.prestamistaRecursoService.addRecursoPrestamista(prestamistaId, recursoId);
    }
  
    @Get(':prestamistaId/recursos/:recursoId')
    async findRecursoByPrestamistaIdRecursoId(
      @Param('prestamistaId') prestamistaId: string,
      @Param('recursoId') recursoId: string,
    ) {
      return await this.prestamistaRecursoService.findRecursoByPrestamistaIdRecursoId(
        prestamistaId,
        recursoId,
      );
    }
  
    @Get(':prestamistaId/recursos')
    async findRecursosByPrestamistaId(@Param('prestamistaId') prestamistaId: string) {
      return await this.prestamistaRecursoService.findRecursosByPrestamistaId(prestamistaId);
    }
  
    @Put(':prestamistaId/recursos')
    async associateRecursosPrestamista(
      @Body() recursosDto: RecursoDto[],
      @Param('prestamistaId') prestamistaId: string,
    ) {
      const recursos = plainToInstance(RecursoEntity, recursosDto);
      return await this.prestamistaRecursoService.associateRecursosPrestamista(prestamistaId, recursos);
    }
  
    @Delete(':prestamistaId/recursos/:recursoId')
    @HttpCode(204)
    async deleteRecursoPrestamista(
      @Param('prestamistaId') prestamistaId: string,
      @Param('recursoId') recursoId: string,
    ) {
      return await this.prestamistaRecursoService.deleteRecursoPrestamista(prestamistaId, recursoId);
    }
  }
  