import { Module } from '@nestjs/common';
import { DeudorEntity } from 'src/deudor/deudor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Module({})
export class PrestamoModule {}
