import { Module } from '@nestjs/common';
import { PrestamoEntity } from 'src/prestamo/prestamo.module';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deudor {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  nombreCompleto: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  email: string;

  @Column()
  ocupacion: string;

  @Column()
  foto: string;
  @OneToMany(() => PrestamoEntity, prestamo => prestamo.deudorId)
    prestamo: PrestamoEntity[];
}

@Module({})
export class DeudorModule {}
