import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrestamoEntity } from '../prestamo/prestamo.entity';
import { RecursoEntity } from '../recurso/recurso.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class RecursoPrestamoService 
{
    constructor
    (
        @InjectRepository(RecursoEntity)
        private readonly recursoRepository: Repository<RecursoEntity>,

        @InjectRepository(PrestamoEntity)
        private readonly prestamoRepository: Repository<PrestamoEntity>
    ){}
    
    // Relacoinar un prestamo a un recurso.
    async addPrestamoRecurso(recursoId: string, prestamoId: string): Promise<RecursoEntity>
     {
        const prestamo: PrestamoEntity = await this.prestamoRepository.findOne({where: {id: prestamoId}});
        // Se verifica que el prestamo exista.
        if (!prestamo)
          throw new BusinessLogicException("No se encontro el prestamo con el Id dado", BusinessError.NOT_FOUND);
      
        const recurso: RecursoEntity = await this.recursoRepository.findOne({where: {id: recursoId}, relations: ["prestamos"]})
        // Se verifica que el recurso exista.
        if (!recurso)
          throw new BusinessLogicException("No se encontro el recurso con el Id dado", BusinessError.NOT_FOUND);
        
        // Variable para registrar cuanto de un recurso esta actualmente prestado.
        let prestado = 0;
        // Se calcula cuanto de un recurso esta actualmente prestado sumando todos los valores de los prestamos asociados al recurso.
        for(let i = 0; i < recurso.prestamos.length; i++)
            {
                prestado += recurso.prestamos[i].monto;
            }
        // Se verifica que la suma de los prestamos asociados al recurso no superen su valor.
        if(recurso.valor - prestado < prestamo.monto)
            throw new BusinessLogicException("El monto del prestamo supera el valor del recurso disponible", BusinessError.PRECONDITION_FAILED);
        
        recurso.prestamos = [...recurso.prestamos, prestamo];
        return await this.recursoRepository.save(recurso);
      }
    
    // Buscar un prestamo por id del recuro y prestamo id.
    async findPrestamoByRecursoIdPrestamoId(recursoId: string, prestamoId: string): Promise<PrestamoEntity>
    {
        const prestamo: PrestamoEntity = await this.prestamoRepository.findOne({where: {id: prestamoId}});
        // Se verifica que el prestamo exista.
        if (!prestamo)
          throw new BusinessLogicException("No se encontro el prestamo con el Id dado ", BusinessError.NOT_FOUND)
       
        const recurso: RecursoEntity = await this.recursoRepository.findOne({where: {id: recursoId}});
        // Se verifica que el recurso exista.
        if (!recurso)
          throw new BusinessLogicException("No se encontro el recurso con el Id dado", BusinessError.NOT_FOUND)
   
        const recursoPrestamo: PrestamoEntity = recurso.prestamos.find(e => e.id === prestamo.id);
        // Se verifica que el prestamo este asociado al recurso.
        if (!recursoPrestamo)
          throw new BusinessLogicException("El prestamo con el Id dado no esta asociado al recurso", BusinessError.PRECONDITION_FAILED)
   
        return recursoPrestamo;
    }
    
    // Bucar los prestamos asociados a un recurso por id del recurso.
    async findPrestamosByRecursoId(recursoId: string): Promise<PrestamoEntity[]> 
    {
        const recurso: RecursoEntity = await this.recursoRepository.findOne({where: {id: recursoId}, relations: ["prestamos"]});
        // Se verifica que el recurso exista.
        if (!recurso)
          throw new BusinessLogicException("No se encontro el recurso con el Id dado", BusinessError.NOT_FOUND)
       
        return recurso.prestamos;
    }

    // Asociar un conjunto de prestamos a un recurso.
    async associatePrestamosRecurso(recursoId: string, prestamos: PrestamoEntity[]): Promise<RecursoEntity> 
    {
        const recurso: RecursoEntity = await this.recursoRepository.findOne({where: {id: recursoId}, relations: ["prestamos"]});
        // Se verifica que el recurso exista.
        if (!recurso)
          throw new BusinessLogicException("No se encontro el recurso con el Id dado", BusinessError.NOT_FOUND)
    
        // Se verifica que los prestamos existan.
        for (let i = 0; i < prestamos.length; i++) 
        {
          const prestamo: PrestamoEntity = await this.prestamoRepository.findOne({where: {id: prestamos[i].id}});
          if (!prestamo)
            throw new BusinessLogicException("No se encontro un prestamo con uno de los Id dados ", BusinessError.NOT_FOUND)
        }

        recurso.prestamos = prestamos;
        return await this.recursoRepository.save(recurso);
      }
    
    // Desasociar un prestamo de un recurso.
    async deletePrestamoRecurso(recursoId: string, prestamoId: string)
    {
        const prestamo: PrestamoEntity = await this.prestamoRepository.findOne({where: {id: prestamoId}, relations: ["pagos"]});
        // Se verifica que el prestamo exista.
        if (!prestamo)
          throw new BusinessLogicException("No se encontro el prestamo con el Id dado ", BusinessError.NOT_FOUND)
    
        const recurso: RecursoEntity = await this.recursoRepository.findOne({where: {id: recursoId}, relations: ["prestamos"]});
        // Se verifica que el recurso exista.
        if (!recurso)
          throw new BusinessLogicException("No se encontro el recurso con el Id dado", BusinessError.NOT_FOUND)
    
        const recursoPrestamo: PrestamoEntity = recurso.prestamos.find(e => e.id === prestamo.id);

        //Se verifica que el prestamo este asociado al recurso
        if (!recursoPrestamo)
            throw new BusinessLogicException("El prestamo con el Id dado no esta asociado al recurso", BusinessError.PRECONDITION_FAILED)
 
        //Calculamos la cantidad de capital pagado del prestamo.
        let pagado = 0;
        for(let i = 0; i < prestamo.historialpagos.length; i++)
        {
            pagado += prestamo.historialpagos[i].capital;
        }
        // Se verifica que el prestamo haya sido pagado
        if(pagado < prestamo.monto)
            throw new BusinessLogicException("El prestamo no puede ser desasociado debido a que no se ha pagado la totalidad del capital prestado", BusinessError.PRECONDITION_FAILED);

        recurso.prestamos = recurso.prestamos.filter(e => e.id !== prestamoId);
        await this.recursoRepository.save(recurso);
    }  

}
