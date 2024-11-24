import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoEntity } from '../prestamo/prestamo.entity';
import { PrestamistaEntity } from '../prestamista/prestamista.entity';
import { PrestamistaPrestamoService } from './prestamista-prestamo.service';

@Module({
  providers: [PrestamistaPrestamoService],
  imports: [TypeOrmModule.forFeature([PrestamistaEntity, PrestamoEntity])],
})
export class PrestamistaPrestamoModule {}