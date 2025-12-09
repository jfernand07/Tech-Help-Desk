"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("./tickets.service");
const ticket_entity_1 = require("./entities/ticket.entity");
const rol_usuario_enum_1 = require("../usuarios/rol-usuario.enum");
const mockRepository = () => ({
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
    delete: jest.fn(),
});
describe('TicketsService', () => {
    let service;
    const ticketRepository = mockRepository();
    const clientRepository = mockRepository();
    const technicianRepository = mockRepository();
    const categoryRepository = mockRepository();
    beforeEach(() => {
        jest.clearAllMocks();
        service = new tickets_service_1.TicketsService(ticketRepository, clientRepository, technicianRepository, categoryRepository);
    });
    it('crea un ticket con cliente y categoría válidos', async () => {
        const dto = {
            title: 'Falla de login',
            description: 'No permite ingresar',
            priority: ticket_entity_1.TicketPriority.MEDIUM,
            category_id: 'cat-1',
        };
        categoryRepository.findOne.mockResolvedValue({ id: 'cat-1' });
        clientRepository.findOne.mockResolvedValue({ id: 'cli-1' });
        ticketRepository.create.mockReturnValue({ id: 'ticket-1', ...dto, status: ticket_entity_1.TicketStatus.OPEN });
        ticketRepository.save.mockResolvedValue({ id: 'ticket-1', ...dto, status: ticket_entity_1.TicketStatus.OPEN });
        const result = await service.create(dto, { id: 'user-1', rol: rol_usuario_enum_1.RolUsuario.CLIENTE });
        expect(result).toEqual(expect.objectContaining({ id: 'ticket-1', status: ticket_entity_1.TicketStatus.OPEN }));
        expect(ticketRepository.create).toHaveBeenCalled();
    });
    it('cambia estado respetando la secuencia y límite de 5 en progreso', async () => {
        const ticket = {
            id: 'ticket-1',
            status: ticket_entity_1.TicketStatus.OPEN,
            technician_id: 'tech-1',
            technician: { id: 'tech-1', usuario_id: 'user-tech' },
        };
        ticketRepository.findOne.mockResolvedValue(ticket);
        ticketRepository.count.mockResolvedValue(3);
        ticketRepository.save.mockImplementation(async (payload) => payload);
        const result = await service.changeStatus('ticket-1', ticket_entity_1.TicketStatus.IN_PROGRESS, {
            id: 'user-tech',
            rol: rol_usuario_enum_1.RolUsuario.TECNICO,
        });
        expect(result.status).toBe(ticket_entity_1.TicketStatus.IN_PROGRESS);
        expect(ticketRepository.count).toHaveBeenCalledWith({
            where: {
                technician: { id: ticket.technician_id },
                status: ticket_entity_1.TicketStatus.IN_PROGRESS,
            },
        });
    });
    it('lanza error si se supera el límite de 5 tickets en progreso', async () => {
        const ticket = {
            id: 'ticket-1',
            status: ticket_entity_1.TicketStatus.OPEN,
            technician_id: 'tech-1',
            technician: { id: 'tech-1', usuario_id: 'user-tech' },
        };
        ticketRepository.findOne.mockResolvedValue(ticket);
        ticketRepository.count.mockResolvedValue(5);
        await expect(service.changeStatus('ticket-1', ticket_entity_1.TicketStatus.IN_PROGRESS, {
            id: 'user-tech',
            rol: rol_usuario_enum_1.RolUsuario.TECNICO,
        })).rejects.toBeInstanceOf(common_1.BadRequestException);
    });
    it('rechaza acceso de cliente a ticket ajeno', async () => {
        const ticket = { id: 't1', client: { usuario_id: 'other' } };
        ticketRepository.findOne.mockResolvedValue(ticket);
        await expect(service.findOneSecure('t1', { id: 'user-1', rol: rol_usuario_enum_1.RolUsuario.CLIENTE })).rejects.toBeInstanceOf(common_1.ForbiddenException);
    });
    it('rechaza historial si cliente no coincide', async () => {
        clientRepository.findOne.mockResolvedValue({ id: 'cli-real' });
        await expect(service.findByClient('cli-other', { id: 'user-1', rol: rol_usuario_enum_1.RolUsuario.CLIENTE })).rejects.toBeInstanceOf(common_1.ForbiddenException);
    });
    it('actualiza asignando categoría y técnico', async () => {
        ticketRepository.findOne.mockResolvedValue({ id: 't1' });
        categoryRepository.findOne.mockResolvedValue({ id: 'cat' });
        technicianRepository.findOne.mockResolvedValue({ id: 'tech' });
        ticketRepository.save.mockResolvedValue({ id: 't1', category_id: 'cat', technician_id: 'tech' });
        const updated = await service.update('t1', { category_id: 'cat', technician_id: 'tech' });
        expect(updated.technician_id).toBe('tech');
    });
    it('lanza si categoría no existe al actualizar', async () => {
        ticketRepository.findOne.mockResolvedValue({ id: 't1' });
        categoryRepository.findOne.mockResolvedValue(null);
        await expect(service.update('t1', { category_id: 'no-cat' })).rejects.toBeInstanceOf(Error);
    });
    it('lanza si categoría no existe al crear', async () => {
        categoryRepository.findOne.mockResolvedValue(null);
        await expect(service.create({ category_id: 'no-cat' }, { id: 'u', rol: rol_usuario_enum_1.RolUsuario.CLIENTE })).rejects.toBeInstanceOf(Error);
    });
});
//# sourceMappingURL=tickets.service.spec.js.map