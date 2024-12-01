import { Module } from '@nestjs/common';
import { RecursoService } from './recurso.service';
import { RecursoEntity } from './recurso.entity';

@Module({
  imports: [RecursoEntity],
  providers: [RecursoService]
})
export class RecursoModule {}
