/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuarios/usuario.module';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { ClienteModule } from './cliente/cliente.module';
import { CategoriesModule } from './categories/categories.module';
import { TechniciansModule } from './technicians/technicians.module';
import configuration from './config/configuration';

@Module({
  imports: [
    // ConfigModule para variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    // TypeORM Module
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    // Módulos de la aplicación
    UsuarioModule,
    AuthModule,
    TicketsModule,
    ClienteModule,
    CategoriesModule,
    TechniciansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
