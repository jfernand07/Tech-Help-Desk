import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
export declare class Cliente {
    id: string;
    name: string;
    company: string;
    contactEmail: string;
    usuario: Usuario;
    usuario_id: string;
    tickets: Ticket[];
    createdAt: Date;
    updatedAt: Date;
}
