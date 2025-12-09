import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
export declare class Technician {
    id: string;
    name: string;
    specialty: string;
    availability: boolean;
    usuario: Usuario;
    usuario_id: string;
    tickets: Ticket[];
    createdAt: Date;
    updatedAt: Date;
}
