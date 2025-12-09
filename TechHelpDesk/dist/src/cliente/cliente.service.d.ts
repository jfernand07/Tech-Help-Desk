import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
export declare class ClienteService {
    private clienteRepository;
    constructor(clienteRepository: Repository<Cliente>);
    findAll(): Promise<Cliente[]>;
    findOne(id: string): Promise<Cliente>;
    findByEmail(email: string): Promise<Cliente>;
    create(createClienteDto: any): Promise<Cliente>;
    update(id: string, updateClienteDto: any): Promise<Cliente>;
    remove(id: string): Promise<void>;
}
