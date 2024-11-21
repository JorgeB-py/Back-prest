import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeudorEntity } from 'src/deudor/deudor.entity';
import { DeudorService } from 'src/deudor/deudor.service';
import { DeudorPrestamoController } from './deudor-prestamo.controller';
import { PrestamoEntity } from 'src/prestamo/prestamo.entity';
import { DeudorPrestamoService } from './deudor-prestamo.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeudorEntity, PrestamoEntity])],
  providers: [DeudorService, DeudorPrestamoService],
  controllers: [DeudorPrestamoController],
})
export class DeudorPrestamoModule {}
