import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
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
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrestamistaPrestamoModule } from './prestamista-prestamo/prestamista-prestamo.module';
import { PrestamistaRecursoModule } from './prestamista-recurso/prestamista-recurso.module';
import { PagoModule } from './pago/pago.module';
import { PagoEntity } from './pago/pago.entity';
import { PrestamoPagoModule } from './prestamo-pago/prestamo-pago.module';
import { RecursoPrestamoModule } from './recurso-prestamo/recurso-prestamo.module';
import { AppService } from './app.service';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [DeudorModule, PrestamoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [PrestamoEntity, DeudorEntity, PrestamistaEntity, RecursoEntity, PagoEntity, UserEntity],
      dropSchema: false,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    DeudorPrestamoModule,
    PrestamistaModule,
    RecursoModule,
    UserModule,
    AuthModule,
    PrestamistaPrestamoModule,
    PrestamistaRecursoModule,
    PagoModule,
    PrestamoPagoModule,
    RecursoPrestamoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
