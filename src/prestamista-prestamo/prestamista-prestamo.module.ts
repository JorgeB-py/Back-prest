import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoEntity } from '../prestamo/prestamo.entity';
import { PrestamistaEntity } from '../prestamista/prestamista.entity';
import { PrestamistaPrestamoService } from './prestamista-prestamo.service';
import { PrestamistaPrestamoController } from './prestamista-prestamo.controller';

@Module({
  providers: [PrestamistaPrestamoService],
  imports: [TypeOrmModule.forFeature([PrestamistaEntity, PrestamoEntity])],
  controllers: [PrestamistaPrestamoController],
})
export class PrestamistaPrestamoModule {}