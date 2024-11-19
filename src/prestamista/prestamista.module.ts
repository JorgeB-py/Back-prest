import { Module } from '@nestjs/common';
import { PrestamistaService } from './prestamista.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamistaEntity } from './prestamista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrestamistaEntity])],
  providers: [PrestamistaService]
})

export class PrestamistaModule {}
