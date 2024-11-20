import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DeudorEntity } from '../deudor/deudor.entity';

@Entity()
export class PrestamoEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  monto: number;

  @Column()
  interes: number;

  @Column()
  fechainicio: Date;

  @Column()
  fechafin: Date;

  @Column()
  pagado: boolean;

  @ManyToOne(() => DeudorEntity, deudor => deudor.id)
    deudor: DeudorEntity;
}