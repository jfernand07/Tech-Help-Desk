/* istanbul ignore file */
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Technician } from '../technicians/entities/technician.entity';
import { Category } from '../categories/entities/category.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tech_helpdesk',
  // Entidades clave: usuarios (incluye rol admin/cliente/técnico), clientes, técnicos, categorías y tickets
  entities: [Usuario, Cliente, Technician, Category, Ticket],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
});
