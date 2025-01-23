import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import jwtConstants from '../shared/security/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';

@Module({
   imports: [
       UserModule,
       TypeOrmModule.forFeature([UserEntity]),
       PassportModule,
       JwtModule.register({
         secret: jwtConstants.JWT_SECRET,
         signOptions: { expiresIn: jwtConstants.JWT_EXPIRES_IN },
       })
     ],
   providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
   exports: [AuthService]
  
})
export class AuthModule {}