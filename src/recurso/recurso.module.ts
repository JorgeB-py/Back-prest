import { Module } from '@nestjs/common';
import { RecursoService } from './recurso.service';
import { RecursoEntity } from './recurso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RecursoEntity])],
  providers: [RecursoService],
  exports: [RecursoService],
})
export class RecursoModule {}
