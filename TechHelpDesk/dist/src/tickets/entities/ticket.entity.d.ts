import { Cliente } from '../../cliente/entities/cliente.entity';
import { Technician } from '../../technicians/entities/technician.entity';
import { Category } from '../../categories/entities/category.entity';
export declare enum TicketStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    RESOLVED = "RESOLVED",
    CLOSED = "CLOSED"
}
export declare enum TicketPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL"
}
export declare class Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    client: Cliente;
    client_id: string;
    technician: Technician;
    technician_id: string;
    category: Category;
    category_id: string;
    createdAt: Date;
    updatedAt: Date;
}
