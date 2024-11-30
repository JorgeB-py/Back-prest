import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagoEntity } from 'src/pago/pago.entity';
import { PrestamoEntity } from 'src/prestamo/prestamo.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PrestamoPagoService {

    constructor(
        @InjectRepository(PrestamoEntity)
        private readonly prestamoRepository: Repository<PrestamoEntity>,

        @InjectRepository(PagoEntity)
        private readonly pagoRepository: Repository<PagoEntity>
        
    ){}

    async addPagoPrestamo(prestamoId: string, pagoId: string): Promise<PrestamoEntity> {
        const pago: PagoEntity = await this.pagoRepository.findOne({where: {id: pagoId}});
        if (!pago)
          throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND);
      
        const prestamo: PrestamoEntity = await this.prestamoRepository.findOne({where: {id: prestamoId}, relations: ["historialpagos"]})
        if (!prestamo)
          throw new BusinessLogicException("The prestamo with the given id was not found", BusinessError.NOT_FOUND);
    
        prestamo.historialpagos = [...prestamo.historialpagos, pago];
        return await this.prestamoRepository.save(prestamo);
      }

      async deletePagoPrestamo(prestamoId: string, pagoId: string){
        const pago: PagoEntity = await this.pagoRepository.findOne({where: {id: pagoId}});
        if (!pago)
          throw new BusinessLogicException("The pago with the given id was not found", BusinessError.NOT_FOUND)
    
        const prestamo: PrestamoEntity = await this.prestamoRepository.findOne({where: {id: prestamoId}, relations: ["historialpagos"]});
        if (!prestamo)
          throw new BusinessLogicException("The prestamo with the given id was not found", BusinessError.NOT_FOUND)
    
        const prestamoPago: PagoEntity = prestamo.historialpagos.find(e => e.id === pago.id);
    
        if (!prestamoPago)
            throw new BusinessLogicException("The pago with the given id is not associated to the prestamo", BusinessError.PRECONDITION_FAILED)
 
        prestamo.historialpagos = prestamo.historialpagos.filter(e => e.id !== pagoId);
        await this.prestamoRepository.save(prestamo);
    } 

    
}
