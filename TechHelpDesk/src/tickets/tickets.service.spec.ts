import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketPriority, TicketStatus } from './entities/ticket.entity';
import { RolUsuario } from '../usuarios/rol-usuario.enum';

const mockRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  count: jest.fn(),
  delete: jest.fn(),
});

describe('TicketsService', () => {
  let service: TicketsService;
  const ticketRepository = mockRepository();
  const clientRepository = mockRepository();
  const technicianRepository = mockRepository();
  const categoryRepository = mockRepository();

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TicketsService(
      ticketRepository as any,
      clientRepository as any,
      technicianRepository as any,
      categoryRepository as any,
    );
  });

  it('crea un ticket con cliente y categoría válidos', async () => {
    const dto = {
      title: 'Falla de login',
      description: 'No permite ingresar',
      priority: TicketPriority.MEDIUM,
      category_id: 'cat-1',
    } as any;

    categoryRepository.findOne.mockResolvedValue({ id: 'cat-1' });
    clientRepository.findOne.mockResolvedValue({ id: 'cli-1' });
    ticketRepository.create.mockReturnValue({ id: 'ticket-1', ...dto, status: TicketStatus.OPEN });
    ticketRepository.save.mockResolvedValue({ id: 'ticket-1', ...dto, status: TicketStatus.OPEN });

    const result = await service.create(dto, { id: 'user-1', rol: RolUsuario.CLIENTE });

    expect(result).toEqual(expect.objectContaining({ id: 'ticket-1', status: TicketStatus.OPEN }));
    expect(ticketRepository.create).toHaveBeenCalled();
  });

  it('cambia estado respetando la secuencia y límite de 5 en progreso', async () => {
    const ticket = {
      id: 'ticket-1',
      status: TicketStatus.OPEN,
      technician_id: 'tech-1',
      technician: { id: 'tech-1', usuario_id: 'user-tech' },
    } as any;

    ticketRepository.findOne.mockResolvedValue(ticket);
    ticketRepository.count.mockResolvedValue(3);
    ticketRepository.save.mockImplementation(async (payload: any) => payload);

    const result = await service.changeStatus('ticket-1', TicketStatus.IN_PROGRESS, {
      id: 'user-tech',
      rol: RolUsuario.TECNICO,
    });

    expect(result.status).toBe(TicketStatus.IN_PROGRESS);
    expect(ticketRepository.count).toHaveBeenCalledWith({
      where: {
        technician: { id: ticket.technician_id },
        status: TicketStatus.IN_PROGRESS,
      },
    });
  });

  it('lanza error si se supera el límite de 5 tickets en progreso', async () => {
    const ticket = {
      id: 'ticket-1',
      status: TicketStatus.OPEN,
      technician_id: 'tech-1',
      technician: { id: 'tech-1', usuario_id: 'user-tech' },
    } as any;

    ticketRepository.findOne.mockResolvedValue(ticket);
    ticketRepository.count.mockResolvedValue(5);

    await expect(
      service.changeStatus('ticket-1', TicketStatus.IN_PROGRESS, {
        id: 'user-tech',
        rol: RolUsuario.TECNICO,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rechaza acceso de cliente a ticket ajeno', async () => {
    const ticket = { id: 't1', client: { usuario_id: 'other' } } as any;
    ticketRepository.findOne.mockResolvedValue(ticket);
    await expect(
      service.findOneSecure('t1', { id: 'user-1', rol: RolUsuario.CLIENTE }),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('rechaza historial si cliente no coincide', async () => {
    clientRepository.findOne.mockResolvedValue({ id: 'cli-real' });
    await expect(
      service.findByClient('cli-other', { id: 'user-1', rol: RolUsuario.CLIENTE }),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('actualiza asignando categoría y técnico', async () => {
    ticketRepository.findOne.mockResolvedValue({ id: 't1' } as any);
    categoryRepository.findOne.mockResolvedValue({ id: 'cat' });
    technicianRepository.findOne.mockResolvedValue({ id: 'tech' });
    ticketRepository.save.mockResolvedValue({ id: 't1', category_id: 'cat', technician_id: 'tech' });
    const updated = await service.update('t1', { category_id: 'cat', technician_id: 'tech' } as any);
    expect(updated.technician_id).toBe('tech');
  });

  it('lanza si categoría no existe al actualizar', async () => {
    ticketRepository.findOne.mockResolvedValue({ id: 't1' } as any);
    categoryRepository.findOne.mockResolvedValue(null);
    await expect(service.update('t1', { category_id: 'no-cat' } as any)).rejects.toBeInstanceOf(Error);
  });

  it('lanza si categoría no existe al crear', async () => {
    categoryRepository.findOne.mockResolvedValue(null);
    await expect(
      service.create({ category_id: 'no-cat' } as any, { id: 'u', rol: RolUsuario.CLIENTE }),
    ).rejects.toBeInstanceOf(Error);
  });
});
