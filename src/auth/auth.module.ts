import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtStrategy} from "./jwt.strategy";
import { JwtAdminStrategy } from './jwtAdmin.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAdminStrategy],
  exports: [JwtStrategy, JwtAdminStrategy],
})
export class AuthModule {}
