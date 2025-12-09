/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { RolUsuario } from '../usuarios/rol-usuario.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) { }

  async seed(): Promise<void> {
    console.log(' Iniciando seeders...');

    // Seed Usuarios
    await this.seedUsuarios();

    // Seed Clientes
    await this.seedClientes();

    console.log(' Seeders completados');
  }

  private async seedUsuarios(): Promise<void> {
    const usuarios = [
      {
        email: 'admin@riwi.com',
        password: await bcrypt.hash('admin123', 10),
        nombre: 'Admin',
        apellido: 'Sistema',
        rol: RolUsuario.ADMIN,
        activo: true,
      },
      {
        email: 'cliente@riwi.com',
        password: await bcrypt.hash('cliente123', 10),
        nombre: 'Cliente',
        apellido: 'Demo',
        rol: RolUsuario.CLIENTE,
        activo: true,
      },
      {
        email: 'tecnico@riwi.com',
        password: await bcrypt.hash('tecnico123', 10),
        nombre: 'Tecnico',
        apellido: 'Soporte',
        rol: RolUsuario.TECNICO,
        activo: true,
      },
    ];

    for (const usuarioData of usuarios) {
      const existe = await this.usuarioRepository.findOne({
        where: { email: usuarioData.email },
      });
      if (!existe) {
        const usuario = this.usuarioRepository.create(usuarioData);
        await this.usuarioRepository.save(usuario);
        console.log(`Usuario creado: ${usuarioData.email}`);
      }
    }
  }

  private async seedClientes(): Promise<void> {
    const clienteUsuario = await this.usuarioRepository.findOne({
      where: { email: 'cliente@riwi.com' },
    });

    if (!clienteUsuario) return;

    const clientes = [
      {
        name: 'Cliente Demo',
        company: 'Riwi Tech',
        contactEmail: 'cliente@riwi.com',
        usuario: clienteUsuario,
      },
    ];

    for (const clienteData of clientes) {
      const existe = await this.clienteRepository.findOne({
        where: { contactEmail: clienteData.contactEmail },
      });
      if (!existe) {
        const cliente = this.clienteRepository.create(clienteData);
        await this.clienteRepository.save(cliente);
        console.log(` Cliente creado: ${clienteData.contactEmail}`);
      }
    }
  }
}
