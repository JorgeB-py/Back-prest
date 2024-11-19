import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DeudorModule } from './deudor/deudor.module';
import { DeudorEntity } from './deudor/deudor.entity';
import {PrestamoModule } from './prestamo/prestamo.module';
import { PrestamoEntity } from './prestamo/prestamo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeudorPrestamoModule } from './deudor-prestamo/deudor-prestamo.module';
import { PrestamistaModule } from './prestamista/prestamista.module';
import { PrestamistaEntity } from './prestamista/prestamista.entity';
import { RecursoModule } from './recurso/recurso.module';
import { RecursoEntity } from './recurso/recurso.entity';

@Module({
  imports: [DeudorModule, PrestamoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',   
      password: 'postgres',
      database: 'Prest',
      entities: [PrestamoEntity, DeudorEntity, PrestamistaEntity, RecursoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    DeudorPrestamoModule,
    PrestamistaModule,
    RecursoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
