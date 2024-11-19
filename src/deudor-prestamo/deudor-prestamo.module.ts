import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeudorEntity } from 'src/deudor/deudor.entity';
import { DeudorService } from 'src/deudor/deudor.service';
import { DeudorPrestamoController } from './deudor-prestamo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DeudorEntity])],
  providers: [DeudorService],
  controllers: [DeudorPrestamoController],
})
export class DeudorPrestamoModule {}
