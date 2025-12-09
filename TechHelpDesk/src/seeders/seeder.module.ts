/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Cliente])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule { }
