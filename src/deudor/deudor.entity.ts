import { PrestamoEntity } from 'src/prestamo/prestamo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DeudorEntity {
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
  @OneToMany(() => PrestamoEntity, prestamos => prestamos.deudor)
    prestamos: PrestamoEntity[];
}