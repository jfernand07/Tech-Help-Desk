/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) { }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      relations: ['usuario', 'tickets'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Cliente> {
    return this.clienteRepository.findOne({
      where: { id },
      relations: ['usuario', 'tickets'],
    });
  }

  async findByEmail(email: string): Promise<Cliente> {
    return this.clienteRepository.findOne({
      where: { contactEmail: email },
      relations: ['usuario'],
    });
  }

  async create(createClienteDto: any): Promise<Cliente> {
    const cliente = this.clienteRepository.create(createClienteDto);
    return (await this.clienteRepository.save(cliente)) as unknown as Cliente;
  }

  async update(id: string, updateClienteDto: any): Promise<Cliente> {
    await this.clienteRepository.update(id, updateClienteDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
