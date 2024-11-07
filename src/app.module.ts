import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DeudorModule } from './deudor/deudor.module';
import { DeudorEntity } from './deudor/deudor.entity';
import {PrestamoModule } from './prestamo/prestamo.module';
import { PrestamoEntity } from './prestamo/prestamo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeudorPrestamoModule } from './deudor-prestamo/deudor-prestamo.module';

@Module({
  imports: [DeudorModule, PrestamoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',   
      password: 'postgres',
      database: 'Prest',
      entities: [PrestamoEntity, DeudorEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    DeudorPrestamoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
