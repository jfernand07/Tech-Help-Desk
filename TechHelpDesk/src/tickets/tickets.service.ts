import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Technician } from '../technicians/entities/technician.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateTicketDto } from './dto/create-tickets.dto';
import { UpdateTicketDto } from './dto/update-tickets.dto';
import { RolUsuario } from '../usuarios/rol-usuario.enum';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Cliente)
    private readonly clientRepository: Repository<Cliente>,
    @InjectRepository(Technician)
    private readonly technicianRepository: Repository<Technician>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createTicketDto: CreateTicketDto, user: any) {
    const category = await this.categoryRepository.findOne({ where: { id: createTicketDto.category_id } });
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    let client: Cliente | null = null;
    if (user?.rol === RolUsuario.CLIENTE) {
      client = await this.clientRepository.findOne({ where: { usuario_id: user.id } });
    } else if (createTicketDto.client_id) {
      client = await this.clientRepository.findOne({ where: { id: createTicketDto.client_id } });
    }

    if (!client) {
      throw new BadRequestException('El ticket requiere un cliente válido');
    }

    let technician: Technician | null = null;
    if (createTicketDto.technician_id) {
      technician = await this.technicianRepository.findOne({ where: { id: createTicketDto.technician_id } });
      if (!technician) {
        throw new NotFoundException('Técnico no encontrado');
      }
    }

    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      client,
      category,
      technician: technician ?? null,
      status: TicketStatus.OPEN,
    });

    return this.ticketRepository.save(ticket);
  }

  findAll() {
    return this.ticketRepository.find({ relations: ['client', 'technician', 'category'] });
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['client', 'client.usuario', 'technician', 'technician.usuario', 'category'],
    });
    if (!ticket) throw new NotFoundException('Ticket no encontrado');
    return ticket;
  }

  async findOneSecure(id: string, user: any) {
    const ticket = await this.findOne(id);
    if (user?.rol === RolUsuario.CLIENTE && ticket.client?.usuario_id !== user.id) {
      throw new ForbiddenException('No puedes acceder a este ticket');
    }
    if (user?.rol === RolUsuario.TECNICO && ticket.technician?.usuario_id !== user.id) {
      throw new ForbiddenException('Ticket no asignado a este técnico');
    }
    return ticket;
  }

  async findByClient(clientId: string, user: any) {
    if (user?.rol === RolUsuario.CLIENTE) {
      const ownClient = await this.clientRepository.findOne({ where: { usuario_id: user.id } });
      if (!ownClient || ownClient.id !== clientId) {
        throw new ForbiddenException('Solo puedes consultar tu propio historial');
      }
    }

    const client = await this.clientRepository.findOne({ where: { id: clientId } });
    if (!client) throw new NotFoundException('Cliente no encontrado');

    return this.ticketRepository.find({
      where: { client: { id: client.id } },
      relations: ['client', 'technician', 'category'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByTechnician(technicianId: string, user: any) {
    const technician = await this.technicianRepository.findOne({ where: { id: technicianId } });
    if (!technician) throw new NotFoundException('Técnico no encontrado');

    if (user?.rol === RolUsuario.TECNICO && user.id !== technician.usuario_id) {
      throw new ForbiddenException('Solo puedes consultar tus tickets asignados');
    }

    return this.ticketRepository.find({
      where: { technician: { id: technician.id } },
      relations: ['client', 'technician', 'category'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.findOne(id);

    if (updateTicketDto.category_id) {
      const category = await this.categoryRepository.findOne({ where: { id: updateTicketDto.category_id } });
      if (!category) throw new NotFoundException('Categoría no encontrada');
      ticket.category = category;
      ticket.category_id = category.id;
    }

    if (updateTicketDto.technician_id) {
      const technician = await this.technicianRepository.findOne({ where: { id: updateTicketDto.technician_id } });
      if (!technician) throw new NotFoundException('Técnico no encontrado');
      ticket.technician = technician;
      ticket.technician_id = technician.id;
    }

    Object.assign(ticket, updateTicketDto);
    return this.ticketRepository.save(ticket);
  }

  async changeStatus(id: string, newStatus: TicketStatus, user: any) {
    const ticket = await this.findOne(id);

    if (user?.rol === RolUsuario.TECNICO && ticket.technician?.usuario_id !== user.id) {
      throw new ForbiddenException('Ticket no asignado a este técnico');
    }

    this.validateStatusTransition(ticket.status, newStatus);

    if (newStatus === TicketStatus.IN_PROGRESS) {
      if (!ticket.technician_id) {
        throw new BadRequestException('Debe existir un técnico asignado para iniciar el progreso');
      }

      const inProgressTickets = await this.ticketRepository.count({
        where: {
          technician: { id: ticket.technician_id },
          status: TicketStatus.IN_PROGRESS,
        },
      });

      if (inProgressTickets >= 5) {
        throw new BadRequestException('El técnico ya tiene 5 tickets en progreso');
      }
    }

    ticket.status = newStatus;
    return this.ticketRepository.save(ticket);
  }

  async remove(id: string) {
    await this.ticketRepository.delete(id);
    return { deleted: true };
  }

  private validateStatusTransition(currentStatus: TicketStatus, newStatus: TicketStatus) {
    const validTransitions: Record<TicketStatus, TicketStatus[]> = {
      [TicketStatus.OPEN]: [TicketStatus.IN_PROGRESS],
      [TicketStatus.IN_PROGRESS]: [TicketStatus.RESOLVED],
      [TicketStatus.RESOLVED]: [TicketStatus.CLOSED],
      [TicketStatus.CLOSED]: [],
    };

    if (!validTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(`Transición inválida de ${currentStatus} a ${newStatus}`);
    }
  }
}
