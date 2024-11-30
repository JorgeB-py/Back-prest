import { PrestamoEntity } from '../prestamo/prestamo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DeudorEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nombrecompleto: string;

  @Column()
  direccion: string;

  @Column()
  fecha: Date;

  @Column()
  telefono: string;

  @Column()
  email: string;

  @Column()
  ocupacion: string;

  @Column()
  foto: string;
  @OneToMany(() => PrestamoEntity, prestamos => prestamos.deudor)
    prestamos: PrestamoEntity[];
}