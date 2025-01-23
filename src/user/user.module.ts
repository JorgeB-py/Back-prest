import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { PrestamistaService } from '../prestamista/prestamista.service';
import { PrestamistaEntity } from '../prestamista/prestamista.entity';

@Module({
  providers: [UserService, PrestamistaService ,AuthService, JwtService, Reflector],
  controllers: [UserController],
  exports:[UserService],
  imports: [TypeOrmModule.forFeature([UserEntity, PrestamistaEntity])],
})
export class UserModule {}
