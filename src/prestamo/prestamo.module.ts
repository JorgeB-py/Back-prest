import { Module } from '@nestjs/common';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrestamoService } from './prestamo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoEntity } from './prestamo.entity';

@Module({
    providers: [PrestamoService],
    imports: [TypeOrmModule.forFeature([PrestamoEntity])],
    exports: [PrestamoService],
})
export class PrestamoModule {}
