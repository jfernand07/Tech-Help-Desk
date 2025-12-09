import { Ticket } from '../../tickets/entities/ticket.entity';
export declare class Category {
    id: string;
    name: string;
    description: string;
    tickets: Ticket[];
    createdAt: Date;
    updatedAt: Date;
}
