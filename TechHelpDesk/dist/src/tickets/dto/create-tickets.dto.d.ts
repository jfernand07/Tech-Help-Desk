import { TicketPriority } from '../entities/ticket.entity';
export declare class CreateTicketDto {
    title: string;
    description: string;
    priority: TicketPriority;
    category_id: string;
    client_id?: string;
    technician_id?: string;
}
