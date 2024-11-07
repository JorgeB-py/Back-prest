import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeudorModule } from './deudor/deudor.module';
import { PrestamoModule } from './prestamo/prestamo.module';

@Module({
  imports: [DeudorModule, PrestamoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
