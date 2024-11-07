import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeudorEntity } from 'src/deudor/deudor.entity';
import { PrestamoEntity } from 'src/prestamo/prestamo.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class DeudorPrestamoService {
    constructor(
        @InjectRepository(DeudorEntity)
        private readonly deudorRepository: Repository<DeudorEntity>,
    
        @InjectRepository(PrestamoEntity)
        private readonly prestamoRepository: Repository<PrestamoEntity>
    ) {}

    async addPrestamoDeudor(deudorID: number, prestamoID: number): Promise<DeudorEntity> {
        const prestamo: PrestamoEntity = await this.prestamoRepository.findOne({where: {id: prestamoID}});
        if (!prestamo)
          throw new BusinessLogicException("The prestamo with the given id was not found", BusinessError.NOT_FOUND);
      
        const deudor: DeudorEntity = await this.deudorRepository.findOne({where: {id: deudorID}, relations: ["prestamos"]});
        if (!deudor)
          throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND);
    
        deudor.prestamos = [...deudor.prestamos, prestamo];
        return await this.deudorRepository.save(deudor);
      }
    
    async findPrestamoByDeudorIDPrestamoID(deudorID: number, prestamoID: number): Promise<PrestamoEntity> {
        const prestamo: PrestamoEntity = await this.prestamoRepository.findOne({where: {id: prestamoID}});
        if (!prestamo)
          throw new BusinessLogicException("The prestamo with the given id was not found", BusinessError.NOT_FOUND)
       
        const deudor: DeudorEntity = await this.deudorRepository.findOne({where: {id: deudorID}, relations: ["prestamos"]});
        if (!deudor)
          throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND)
   
        const prestamoDeudor: PrestamoEntity = deudor.prestamos.find(e => e.id === prestamo.id);
   
        if (!prestamoDeudor)
          throw new BusinessLogicException("The prestamo with the given id is not associated to the deudor", BusinessError.PRECONDITION_FAILED)
   
        return prestamoDeudor;
    }
    
    async findPrestamosByDeudorId(deudorID: number): Promise<PrestamoEntity[]> {
        const deudor: DeudorEntity = await this.deudorRepository.findOne({where: {id: deudorID}, relations: ["prestamos"]});
        if (!deudor)
          throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND)
       
        return deudor.prestamos;
    }
    
    async associatePrestamosDeudor(deudorId: number, prestamos: PrestamoEntity[]): Promise<DeudorEntity> {
        const deudor: DeudorEntity = await this.deudorRepository.findOne({where: {id: deudorId}, relations: ["prestamos"]});
    
        if (!deudor)
          throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < prestamos.length; i++) {
          const prestamo: PrestamoEntity = await this.prestamoRepository.findOne({where: {id: prestamos[i].id}});
          if (!prestamo)
            throw new BusinessLogicException("The prestamo with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        deudor.prestamos = prestamos;
        return await this.deudorRepository.save(deudor);
      }
    
    async deletePrestamoDeudor(deudorID: number, prestamoID: number){
        const prestamo: PrestamoEntity = await this.prestamoRepository.findOne({where: {id: prestamoID}});
        if (!prestamo)
          throw new BusinessLogicException("The prestamo with the given id was not found", BusinessError.NOT_FOUND)
    
        const deudor: DeudorEntity = await this.deudorRepository.findOne({where: {id: deudorID}, relations: ["prestamos"]});
        if (!deudor)
          throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND)
    
        const deudorPrestamos: PrestamoEntity = deudor.prestamos.find(e => e.id === prestamo.id);
    
        if (!deudorPrestamos)
            throw new BusinessLogicException("The prestamo with the given id is not associated to the deudor", BusinessError.PRECONDITION_FAILED)
 
        deudor.prestamos = deudor.prestamos.filter(e => e.id !== prestamo.id);
        await this.deudorRepository.save(deudor);
    }  
}
