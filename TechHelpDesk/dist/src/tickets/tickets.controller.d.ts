import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-tickets.dto';
import { UpdateTicketDto } from './dto/update-tickets.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { Ticket } from './entities/ticket.entity';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto, user: any): Promise<Ticket>;
    findAll(): Promise<Ticket[]>;
    findByClient(id: string, user: any): Promise<Ticket[]>;
    findByTechnician(id: string, user: any): Promise<Ticket[]>;
    findOne(id: string, user: any): Promise<Ticket>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket>;
    changeStatus(id: string, updateStatusDto: UpdateTicketStatusDto, user: any): Promise<Ticket>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
