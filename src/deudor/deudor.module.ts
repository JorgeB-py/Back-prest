import { Module } from '@nestjs/common';
import { DeudorService } from './deudor.service';
import { DeudorEntity } from './deudor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  providers: [DeudorService],
  imports: [TypeOrmModule.forFeature([DeudorEntity])],
})
export class DeudorModule {}
