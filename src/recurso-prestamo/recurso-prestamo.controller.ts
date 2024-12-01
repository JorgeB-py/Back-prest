import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { RecursoPrestamoService } from './recurso-prestamo.service';
import { PrestamoDto } from 'src/prestamo/prestamo.dto';
import { plainToInstance } from 'class-transformer';
import { PrestamoEntity } from 'src/prestamo/prestamo.entity';

@Controller('recursos')
@UseInterceptors(BusinessErrorsInterceptor)
export class RecursoPrestamoController {
    constructor(
        private readonly recursoPrestamoService: RecursoPrestamoService,
    ) {}   
    
    @Post(':recursoId/prestamos/:prestamoId')
    async addPrestamoRecurso(@Param('recursoId') recursoId: string, @Param ("prestamoId") prestamoId: string)
    {
        return await this.recursoPrestamoService.addPrestamoRecurso(recursoId, prestamoId);
    }

    @Get(':recursoId/prestamos/:prestamoId')
    async findPrestamoByRecursoIdPrestamoId(@Param('recursoId') recursoId: string, @Param ("prestamoId") prestamoId: string)
    {
        return await this.recursoPrestamoService.findPrestamoByRecursoIdPrestamoId(recursoId, prestamoId);
    }

    @Get(':recursoId/prestamos')
    async findPrestamosByRecursoId(@Param('recursoId') recursoId: string)
    {
        return await this.recursoPrestamoService.findPrestamosByRecursoId(recursoId);
    }

    //Puede que no funcione
    @Put(':recursoId/prestamos')
    async associatePrestamosRecurso(@Body() prestamosDto: PrestamoDto[], @Param('recursoId') recursoId: string)
    {   
        const prestamos : PrestamoEntity[] = plainToInstance(PrestamoEntity, prestamosDto);
        return await this.recursoPrestamoService.associatePrestamosRecurso(recursoId, prestamos);
    }

    @Delete(':recursoId/prestamos/:prestamoId')
    @HttpCode(204)
    async deletePrestamoRecurso(@Param('recursoId') recursoId: string, @Param ("prestamoId") prestamoId: string)
    {
        return await this.recursoPrestamoService.deletePrestamoRecurso(recursoId, prestamoId);
    }

    @Delete(':recursoId')
    @HttpCode(204)
    async deleteRecurso(@Param('recursoId') recursoId: string)
    {
        return await this.recursoPrestamoService.deleteRecurso(recursoId);
    }
}
