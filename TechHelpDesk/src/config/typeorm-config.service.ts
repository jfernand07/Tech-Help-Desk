/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Technician } from '../technicians/entities/technician.entity';
import { Category } from '../categories/entities/category.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<string>('database.type') as any,
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      // Entidades principales (admin/cliente/técnico gestionan tickets y categorías)
      entities: [Usuario, Cliente, Technician, Category, Ticket],
      synchronize: this.configService.get<boolean>('database.synchronize'),
      logging: this.configService.get<boolean>('database.logging'),
      migrations: ['dist/migrations/*.js'],
      migrationsRun: false,
      autoLoadEntities: true,
    };
  }
}
