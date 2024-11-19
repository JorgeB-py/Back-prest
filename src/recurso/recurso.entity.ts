import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrestamistaEntity } from 'src/prestamista/prestamista.entity';

export class RecursoEntity {

    @ManyToOne(() => PrestamistaEntity, prestamista => prestamista.recursos)
    prestamista: PrestamistaEntity;
}
