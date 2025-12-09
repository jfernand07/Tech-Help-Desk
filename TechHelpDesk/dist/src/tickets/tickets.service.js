"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
const cliente_entity_1 = require("../cliente/entities/cliente.entity");
const technician_entity_1 = require("../technicians/entities/technician.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const rol_usuario_enum_1 = require("../usuarios/rol-usuario.enum");
let TicketsService = class TicketsService {
    constructor(ticketRepository, clientRepository, technicianRepository, categoryRepository) {
        this.ticketRepository = ticketRepository;
        this.clientRepository = clientRepository;
        this.technicianRepository = technicianRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(createTicketDto, user) {
        const category = await this.categoryRepository.findOne({ where: { id: createTicketDto.category_id } });
        if (!category) {
            throw new common_1.NotFoundException('Categoría no encontrada');
        }
        let client = null;
        if (user?.rol === rol_usuario_enum_1.RolUsuario.CLIENTE) {
            client = await this.clientRepository.findOne({ where: { usuario_id: user.id } });
        }
        else if (createTicketDto.client_id) {
            client = await this.clientRepository.findOne({ where: { id: createTicketDto.client_id } });
        }
        if (!client) {
            throw new common_1.BadRequestException('El ticket requiere un cliente válido');
        }
        let technician = null;
        if (createTicketDto.technician_id) {
            technician = await this.technicianRepository.findOne({ where: { id: createTicketDto.technician_id } });
            if (!technician) {
                throw new common_1.NotFoundException('Técnico no encontrado');
            }
        }
        const ticket = this.ticketRepository.create({
            ...createTicketDto,
            client,
            category,
            technician: technician ?? null,
            status: ticket_entity_1.TicketStatus.OPEN,
        });
        return this.ticketRepository.save(ticket);
    }
    findAll() {
        return this.ticketRepository.find({ relations: ['client', 'technician', 'category'] });
    }
    async findOne(id) {
        const ticket = await this.ticketRepository.findOne({
            where: { id },
            relations: ['client', 'client.usuario', 'technician', 'technician.usuario', 'category'],
        });
        if (!ticket)
            throw new common_1.NotFoundException('Ticket no encontrado');
        return ticket;
    }
    async findOneSecure(id, user) {
        const ticket = await this.findOne(id);
        if (user?.rol === rol_usuario_enum_1.RolUsuario.CLIENTE && ticket.client?.usuario_id !== user.id) {
            throw new common_1.ForbiddenException('No puedes acceder a este ticket');
        }
        if (user?.rol === rol_usuario_enum_1.RolUsuario.TECNICO && ticket.technician?.usuario_id !== user.id) {
            throw new common_1.ForbiddenException('Ticket no asignado a este técnico');
        }
        return ticket;
    }
    async findByClient(clientId, user) {
        if (user?.rol === rol_usuario_enum_1.RolUsuario.CLIENTE) {
            const ownClient = await this.clientRepository.findOne({ where: { usuario_id: user.id } });
            if (!ownClient || ownClient.id !== clientId) {
                throw new common_1.ForbiddenException('Solo puedes consultar tu propio historial');
            }
        }
        const client = await this.clientRepository.findOne({ where: { id: clientId } });
        if (!client)
            throw new common_1.NotFoundException('Cliente no encontrado');
        return this.ticketRepository.find({
            where: { client: { id: client.id } },
            relations: ['client', 'technician', 'category'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByTechnician(technicianId, user) {
        const technician = await this.technicianRepository.findOne({ where: { id: technicianId } });
        if (!technician)
            throw new common_1.NotFoundException('Técnico no encontrado');
        if (user?.rol === rol_usuario_enum_1.RolUsuario.TECNICO && user.id !== technician.usuario_id) {
            throw new common_1.ForbiddenException('Solo puedes consultar tus tickets asignados');
        }
        return this.ticketRepository.find({
            where: { technician: { id: technician.id } },
            relations: ['client', 'technician', 'category'],
            order: { createdAt: 'DESC' },
        });
    }
    async update(id, updateTicketDto) {
        const ticket = await this.findOne(id);
        if (updateTicketDto.category_id) {
            const category = await this.categoryRepository.findOne({ where: { id: updateTicketDto.category_id } });
            if (!category)
                throw new common_1.NotFoundException('Categoría no encontrada');
            ticket.category = category;
            ticket.category_id = category.id;
        }
        if (updateTicketDto.technician_id) {
            const technician = await this.technicianRepository.findOne({ where: { id: updateTicketDto.technician_id } });
            if (!technician)
                throw new common_1.NotFoundException('Técnico no encontrado');
            ticket.technician = technician;
            ticket.technician_id = technician.id;
        }
        Object.assign(ticket, updateTicketDto);
        return this.ticketRepository.save(ticket);
    }
    async changeStatus(id, newStatus, user) {
        const ticket = await this.findOne(id);
        if (user?.rol === rol_usuario_enum_1.RolUsuario.TECNICO && ticket.technician?.usuario_id !== user.id) {
            throw new common_1.ForbiddenException('Ticket no asignado a este técnico');
        }
        this.validateStatusTransition(ticket.status, newStatus);
        if (newStatus === ticket_entity_1.TicketStatus.IN_PROGRESS) {
            if (!ticket.technician_id) {
                throw new common_1.BadRequestException('Debe existir un técnico asignado para iniciar el progreso');
            }
            const inProgressTickets = await this.ticketRepository.count({
                where: {
                    technician: { id: ticket.technician_id },
                    status: ticket_entity_1.TicketStatus.IN_PROGRESS,
                },
            });
            if (inProgressTickets >= 5) {
                throw new common_1.BadRequestException('El técnico ya tiene 5 tickets en progreso');
            }
        }
        ticket.status = newStatus;
        return this.ticketRepository.save(ticket);
    }
    async remove(id) {
        await this.ticketRepository.delete(id);
        return { deleted: true };
    }
    validateStatusTransition(currentStatus, newStatus) {
        const validTransitions = {
            [ticket_entity_1.TicketStatus.OPEN]: [ticket_entity_1.TicketStatus.IN_PROGRESS],
            [ticket_entity_1.TicketStatus.IN_PROGRESS]: [ticket_entity_1.TicketStatus.RESOLVED],
            [ticket_entity_1.TicketStatus.RESOLVED]: [ticket_entity_1.TicketStatus.CLOSED],
            [ticket_entity_1.TicketStatus.CLOSED]: [],
        };
        if (!validTransitions[currentStatus].includes(newStatus)) {
            throw new common_1.BadRequestException(`Transición inválida de ${currentStatus} a ${newStatus}`);
        }
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(cliente_entity_1.Cliente)),
    __param(2, (0, typeorm_1.InjectRepository)(technician_entity_1.Technician)),
    __param(3, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map