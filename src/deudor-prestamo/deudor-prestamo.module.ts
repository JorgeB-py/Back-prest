import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeudorEntity } from 'src/deudor/deudor.entity';
import { DeudorService } from 'src/deudor/deudor.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeudorEntity])],
  providers: [DeudorService],
})
export class DeudorPrestamoModule {}
