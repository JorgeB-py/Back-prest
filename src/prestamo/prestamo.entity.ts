import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DeudorEntity } from '../deudor/deudor.entity';

@Entity()
export class PrestamoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column()
  interes: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column()
  pagado: boolean;

  @ManyToOne(() => DeudorEntity, deudor => deudor.id)
    deudor: DeudorEntity;
}