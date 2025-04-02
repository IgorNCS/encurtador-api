import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService],
  exports: [AuthService],
})
export class AuthModule {}