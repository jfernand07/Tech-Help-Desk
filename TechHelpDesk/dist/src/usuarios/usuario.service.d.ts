import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
export declare class UsuarioService {
    private usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    findAll(): Promise<Usuario[]>;
    findOne(id: string): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario>;
    create(usuarioData: Partial<Usuario>): Promise<Usuario>;
    update(id: string, usuarioData: Partial<Usuario>): Promise<Usuario>;
    remove(id: string): Promise<void>;
}
