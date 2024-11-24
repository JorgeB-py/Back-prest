import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrestamistaEntity } from '../prestamista/prestamista.entity'; 

@Entity() 
export class RecursoEntity {
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column()
    nombre: string;
    
    @ManyToOne(() => PrestamistaEntity, prestamista => prestamista.recursos)
    prestamista: PrestamistaEntity;
}
