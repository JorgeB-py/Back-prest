import { Module } from '@nestjs/common';
import { DeudorService } from './deudor.service';
import { DeudorEntity } from './deudor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeudorController } from './deudor.controller';
@Module({
  providers: [DeudorService],
  imports: [TypeOrmModule.forFeature([DeudorEntity])],
  controllers: [DeudorController],
})
export class DeudorModule {}
