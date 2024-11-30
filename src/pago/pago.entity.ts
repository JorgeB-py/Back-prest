import { PrestamoEntity } from "src/prestamo/prestamo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PagoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' }) 
    fecha: Date;

    @Column() 
    capital: number;

    @Column() 
    interes: number;

    //TODO historialPagos o historial_pagos?
    @ManyToOne(() => PrestamoEntity, prestamo => prestamo.historialPagos)
    prestamo: PrestamoEntity;


}
