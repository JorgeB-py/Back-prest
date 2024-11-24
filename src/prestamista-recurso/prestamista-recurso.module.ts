import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecursoEntity } from '../recurso/recurso.entity';
import { PrestamistaEntity } from '../prestamista/prestamista.entity';
import { PrestamistaRecursoService } from './prestamista-recurso.service';

@Module({
  providers: [PrestamistaRecursoService],
  imports: [TypeOrmModule.forFeature([PrestamistaEntity, RecursoEntity])],
})
export class PrestamistaRecursoModule {}