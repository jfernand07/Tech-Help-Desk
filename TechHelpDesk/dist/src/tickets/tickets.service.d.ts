import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Technician } from '../technicians/entities/technician.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateTicketDto } from './dto/create-tickets.dto';
import { UpdateTicketDto } from './dto/update-tickets.dto';
export declare class TicketsService {
    private readonly ticketRepository;
    private readonly clientRepository;
    private readonly technicianRepository;
    private readonly categoryRepository;
    constructor(ticketRepository: Repository<Ticket>, clientRepository: Repository<Cliente>, technicianRepository: Repository<Technician>, categoryRepository: Repository<Category>);
    create(createTicketDto: CreateTicketDto, user: any): Promise<Ticket>;
    findAll(): Promise<Ticket[]>;
    findOne(id: string): Promise<Ticket>;
    findOneSecure(id: string, user: any): Promise<Ticket>;
    findByClient(clientId: string, user: any): Promise<Ticket[]>;
    findByTechnician(technicianId: string, user: any): Promise<Ticket[]>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket>;
    changeStatus(id: string, newStatus: TicketStatus, user: any): Promise<Ticket>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    private validateStatusTransition;
}
