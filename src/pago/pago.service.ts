import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PagoEntity } from './pago.entity';

@Injectable()
export class PagoService {

    constructor(
        @InjectRepository(PagoEntity)
        private readonly pagoRepository: Repository<PagoEntity>
    ){}

    async create(pago: PagoEntity): Promise<PagoEntity> {
        return await this.pagoRepository.save(pago);
    }

    async delete(id: string) {
        const pago: PagoEntity = await this.pagoRepository.findOne({where:{id}});
        if (!pago)
          throw new BusinessLogicException("The payment with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.pagoRepository.remove(pago);
    }

}
