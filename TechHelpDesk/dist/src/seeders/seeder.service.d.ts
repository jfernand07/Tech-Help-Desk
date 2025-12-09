import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
export declare class SeederService {
    private usuarioRepository;
    private clienteRepository;
    constructor(usuarioRepository: Repository<Usuario>, clienteRepository: Repository<Cliente>);
    seed(): Promise<void>;
    private seedUsuarios;
    private seedClientes;
}
