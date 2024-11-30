import { Injectable } from '@nestjs/common';
import { DeudorEntity } from './deudor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';   



@Injectable()
export class DeudorService {
    constructor(
        @InjectRepository(DeudorEntity)
        private readonly deudorRepository: Repository<DeudorEntity>
    ){}
    
    async calcularInteresesGanadosUltimoMes(deudorId: string): Promise<number> {
        const deudor = await this.deudorRepository.findOne({
          where: { id: deudorId },
          relations: ['prestamos'],
        });
    
        if (!deudor) {
          throw new Error('Deudor no encontrado');
        }
    
        const interesesTotales = deudor.prestamos.reduce((totalIntereses, prestamo) => {
          // Filtrar pagos en el historial del préstamo que estén dentro del último mes
          const fechaHaceUnMes = new Date();
          fechaHaceUnMes.setMonth(fechaHaceUnMes.getMonth() - 1);
    
          const pagosUltimoMes = prestamo.historialPagos.filter(pago => {
            // Convertir la fecha de pago a un objeto Date
            const fechaPago = new Date(pago.fechaPago);
            return fechaPago >= fechaHaceUnMes; // Filtrar los pagos que sean en el último mes
          });
    
          // Sumar los intereses ganados en el último mes
          const interesesGanados = pagosUltimoMes.reduce((total, pago) => total + pago.interes, 0);
          return totalIntereses + interesesGanados;
        }, 0);
    
        return interesesTotales;
      }
    async findAll(): Promise<DeudorEntity[]> {
        return await this.deudorRepository.find({ relations: ["prestamos"] });
    }
    async findOne(id: string): Promise<DeudorEntity> {
        const deudor: DeudorEntity = await this.deudorRepository.findOne({where: {id}, relations: ["prestamos"] } );
        if (!deudor){
            throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND);
        }
        return deudor;
    }
    async create(deudor: DeudorEntity): Promise<DeudorEntity> {
        return await this.deudorRepository.save(deudor);
    }
    async update(id: string, deudor: DeudorEntity): Promise<DeudorEntity> {
        const persistedDeudor: DeudorEntity = await this.deudorRepository.findOne({where:{id}});
        if (!persistedDeudor)
          throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.deudorRepository.save({...persistedDeudor, ...deudor});
    }
    async delete(id: string) {
        const deudor: DeudorEntity = await this.deudorRepository.findOne({where:{id}});
        if (!deudor)
          throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.deudorRepository.remove(deudor);
    }
 
}
