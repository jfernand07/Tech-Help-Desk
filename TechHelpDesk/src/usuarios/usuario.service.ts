import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async create(usuarioData: Partial<Usuario>): Promise<Usuario> {
    const payload = { ...usuarioData } as Usuario;
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }
    const usuario = this.usuarioRepository.create(payload);
    return this.usuarioRepository.save(usuario);
  }

  async update(id: string, usuarioData: Partial<Usuario>): Promise<Usuario> {
    const payload = { ...usuarioData } as Usuario;
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }
    await this.usuarioRepository.update(id, payload);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
