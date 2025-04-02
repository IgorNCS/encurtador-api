import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KeycloakModule } from './keycloak/keycloak.module';
import { AuthModule } from './auth/auth.module';
import { ClsModule } from 'nestjs-cls';
import { LinkModule } from './modules/link/link.module';
import { KeycloakUserMiddleware } from './keycloak/keycloakAuthGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedirectModule } from './modules/redirect/redirect.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      interceptor: { mount: false },
    }),
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: [__dirname + 'database/migrations/**/*{.ts,.js}'],

  }),
  KeycloakModule,
  LinkModule,
  RedirectModule,
  UserModule
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(KeycloakUserMiddleware).forRoutes('*');
  }
}
