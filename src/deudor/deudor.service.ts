import { Injectable } from '@nestjs/common';
import { DeudorEntity } from './deudor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';



@Injectable()
export class DeudorService {
    constructor(
        @InjectRepository(DeudorEntity)
        private readonly deudorRepository: Repository<DeudorEntity>
    ){}
    async findAll(): Promise<DeudorEntity[]> {
        return await this.deudorRepository.find({ relations: ["prestamos"] });
    }
    async findOne(id: number): Promise<DeudorEntity> {
        const deudor: DeudorEntity = await this.deudorRepository.findOne({where: {id}, relations: ["prestamos"] } );
        if (!deudor)
          throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND);
   
        return deudor;
    }
    async create(deudor: DeudorEntity): Promise<DeudorEntity> {
        return await this.deudorRepository.save(deudor);
    }
    async update(id: number, deudor: DeudorEntity): Promise<DeudorEntity> {
        const persistedDeudor: DeudorEntity = await this.deudorRepository.findOne({where:{id}});
        if (!persistedDeudor)
          throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.deudorRepository.save({...persistedDeudor, ...deudor});
    }
    async delete(id: number) {
        const deudor: DeudorEntity = await this.deudorRepository.findOne({where:{id}});
        if (!deudor)
          throw new BusinessLogicException("The deudor with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.deudorRepository.remove(deudor);
    }
 
}
