import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets/tickets.controller';
import { TicketsService } from './tickets/tickets.service';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { ClienteController } from './cliente/cliente.controller';
import { ClienteService } from './cliente/cliente.service';
import { TechniciansController } from './technicians/technicians.controller';
import { TechniciansService } from './technicians/technicians.service';
import { UsuarioController } from './usuarios/usuario.controller';
import { UsuarioService } from './usuarios/usuario.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/dto/login.dto';
import { RegisterDto } from './auth/dto/register.dto';
import { RefreshTokenDto } from './auth/dto/refresh-token.dto';
import { CreateTicketDto } from './tickets/dto/create-tickets.dto';
import { UpdateTicketDto } from './tickets/dto/update-tickets.dto';
import { UpdateTicketStatusDto } from './tickets/dto/update-ticket-status.dto';
import { CreateClienteDto } from './cliente/dto/create-cliente.dto';
import { UpdateClienteDto } from './cliente/dto/update-cliente.dto';
import { RolUsuario } from './usuarios/rol-usuario.enum';
import { TicketStatus } from './tickets/entities/ticket.entity';

// Guards are bypassed by providing empty providers
const guards = [{ provide: RolesGuard, useValue: {} }, { provide: JwtAuthGuard, useValue: {} }];

const ticketServiceMock = {
  create: jest.fn().mockResolvedValue({ id: 't1' }),
  findAll: jest.fn().mockResolvedValue([]),
  findOneSecure: jest.fn().mockResolvedValue({ id: 't1' }),
  findByClient: jest.fn().mockResolvedValue([]),
  findByTechnician: jest.fn().mockResolvedValue([]),
  update: jest.fn().mockResolvedValue({ id: 't1' }),
  changeStatus: jest.fn().mockResolvedValue({ id: 't1', status: TicketStatus.IN_PROGRESS }),
  remove: jest.fn().mockResolvedValue({ deleted: true }),
};

const simpleMock = (returnValue = {}) => ({
  create: jest.fn().mockResolvedValue(returnValue),
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue(returnValue),
  update: jest.fn().mockResolvedValue(returnValue),
  remove: jest.fn().mockResolvedValue({ deleted: true }),
});

const authServiceMock = {
  register: jest.fn().mockResolvedValue({ id: 'u1' }),
  login: jest.fn().mockResolvedValue({ access_token: 'token' }),
  refreshToken: jest.fn().mockResolvedValue({ access_token: 'token2' }),
  googleLogin: jest.fn().mockResolvedValue({ access_token: 'token3' }),
};

describe('Controllers smoke tests', () => {
  describe('TicketsController', () => {
    let controller: TicketsController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [TicketsController],
        providers: [{ provide: TicketsService, useValue: ticketServiceMock }, ...guards],
      }).compile();

      controller = module.get<TicketsController>(TicketsController);
    });

    it('creates ticket', async () => {
      const dto = { title: 'a', description: 'b', category_id: 'c1' } as CreateTicketDto;
      const res = await controller.create(dto, { id: 'u', rol: RolUsuario.CLIENTE });
      expect(res).toEqual({ id: 't1' });
    });

    it('lists tickets', async () => {
      await controller.findAll();
      expect(ticketServiceMock.findAll).toHaveBeenCalled();
    });

    it('changes status', async () => {
      const res = await controller.changeStatus('t1', { status: TicketStatus.IN_PROGRESS } as UpdateTicketStatusDto, {
        id: 'tech',
        rol: RolUsuario.TECNICO,
      });
      expect(res.status).toBe(TicketStatus.IN_PROGRESS);
    });
  });

  describe('CategoriesController', () => {
    it('delegates to service', async () => {
      const service = simpleMock({ id: 'cat' });
      const module = await Test.createTestingModule({
        controllers: [CategoriesController],
        providers: [{ provide: CategoriesService, useValue: service }, ...guards],
      }).compile();
      const controller = module.get<CategoriesController>(CategoriesController);
      await controller.create({ name: 'cat' } as any);
      await controller.findAll();
      await controller.findOne('id');
      await controller.update('id', { name: 'x' });
      await controller.remove('id');
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('ClienteController', () => {
    it('delegates to service', async () => {
      const service = simpleMock({ id: 'cli' });
      const module = await Test.createTestingModule({
        controllers: [ClienteController],
        providers: [{ provide: ClienteService, useValue: service }, ...guards],
      }).compile();
      const controller = module.get<ClienteController>(ClienteController);
      await controller.create({ name: 'c', contactEmail: 'a@b.com' } as CreateClienteDto);
      await controller.findAll();
      await controller.findOne('id');
      await controller.update('id', { name: 'y' } as UpdateClienteDto);
      await controller.remove('id');
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('TechniciansController', () => {
    it('delegates to service', async () => {
      const service = simpleMock({ id: 'tech' });
      const module = await Test.createTestingModule({
        controllers: [TechniciansController],
        providers: [{ provide: TechniciansService, useValue: service }, ...guards],
      }).compile();
      const controller = module.get<TechniciansController>(TechniciansController);
      await controller.create({ name: 't' } as any);
      await controller.findAll();
      await controller.findOne('id');
      await controller.update('id', { name: 'z' } as any);
      await controller.remove('id');
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('UsuarioController', () => {
    it('delegates to service', async () => {
      const service = simpleMock({ id: 'user' });
      const module = await Test.createTestingModule({
        controllers: [UsuarioController],
        providers: [{ provide: UsuarioService, useValue: service }, ...guards],
      }).compile();
      const controller = module.get<UsuarioController>(UsuarioController);
      await controller.create({ email: 'a', password: 'b', nombre: 'c' } as any);
      await controller.findAll();
      await controller.findOne('id');
      await controller.update('id', { nombre: 'd' } as any);
      await controller.remove('id');
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('AuthController', () => {
    it('calls auth service methods', async () => {
      const module = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [{ provide: AuthService, useValue: authServiceMock }],
      }).compile();
      const controller = module.get<AuthController>(AuthController);
      await controller.register({ email: 'x', password: 'y' } as RegisterDto);
      await controller.login({ email: 'x', password: 'y' } as LoginDto);
      await controller.refresh({ refresh_token: 'r' } as RefreshTokenDto);
      expect(authServiceMock.register).toHaveBeenCalled();
      expect(authServiceMock.login).toHaveBeenCalled();
      expect(authServiceMock.refreshToken).toHaveBeenCalled();
    });
  });
});
