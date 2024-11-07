import { Module } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  deudorId: number;
}

@Module({})
export class PrestamoModule {}
