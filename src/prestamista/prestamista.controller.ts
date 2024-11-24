import {Body,Controller,Delete,Get,HttpCode,Param,Post,Put,UseInterceptors,} from '@nestjs/common';
  import { plainToInstance } from 'class-transformer';
  import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
  import { PrestamistaDto } from './prestamista.dto';
  import { PrestamistaEntity } from './prestamista.entity';
  import { PrestamistaService } from './prestamista.service';
  
  @Controller('prestamistas')
  @UseInterceptors(BusinessErrorsInterceptor)
  export class PrestamistaController {
    constructor(private readonly prestamistaService: PrestamistaService) {}
  
    @Get()
    async findAll() {
      return await this.prestamistaService.findAll();
    }
  
    @Get(':prestamistaId')
    async findOne(@Param('prestamistaId') prestamistaId: string) {
      return await this.prestamistaService.findOne(prestamistaId);
    }
  
    @Post()
    async create(@Body() prestamistaDto: PrestamistaDto) {
      const prestamista: PrestamistaEntity = plainToInstance(
        PrestamistaEntity,
        prestamistaDto,
      );
      return await this.prestamistaService.create(prestamista);
    }
  
    @Put(':prestamistaId')
    async update(
      @Param('prestamistaId') prestamistaId: string,
      @Body() prestamistaDto: PrestamistaDto,
    ) {
      const prestamista: PrestamistaEntity = plainToInstance(
        PrestamistaEntity,
        prestamistaDto,
      );
      return await this.prestamistaService.update(prestamistaId, prestamista);
    }
  
    @Delete(':prestamistaId')
    @HttpCode(204)
    async delete(@Param('prestamistaId') prestamistaId: string) {
      return await this.prestamistaService.delete(prestamistaId);
    }
  }
  