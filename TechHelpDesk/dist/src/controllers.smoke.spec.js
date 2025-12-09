"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tickets_controller_1 = require("./tickets/tickets.controller");
const tickets_service_1 = require("./tickets/tickets.service");
const roles_guard_1 = require("./auth/guards/roles.guard");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const categories_controller_1 = require("./categories/categories.controller");
const categories_service_1 = require("./categories/categories.service");
const cliente_controller_1 = require("./cliente/cliente.controller");
const cliente_service_1 = require("./cliente/cliente.service");
const technicians_controller_1 = require("./technicians/technicians.controller");
const technicians_service_1 = require("./technicians/technicians.service");
const usuario_controller_1 = require("./usuarios/usuario.controller");
const usuario_service_1 = require("./usuarios/usuario.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const rol_usuario_enum_1 = require("./usuarios/rol-usuario.enum");
const ticket_entity_1 = require("./tickets/entities/ticket.entity");
const guards = [{ provide: roles_guard_1.RolesGuard, useValue: {} }, { provide: jwt_auth_guard_1.JwtAuthGuard, useValue: {} }];
const ticketServiceMock = {
    create: jest.fn().mockResolvedValue({ id: 't1' }),
    findAll: jest.fn().mockResolvedValue([]),
    findOneSecure: jest.fn().mockResolvedValue({ id: 't1' }),
    findByClient: jest.fn().mockResolvedValue([]),
    findByTechnician: jest.fn().mockResolvedValue([]),
    update: jest.fn().mockResolvedValue({ id: 't1' }),
    changeStatus: jest.fn().mockResolvedValue({ id: 't1', status: ticket_entity_1.TicketStatus.IN_PROGRESS }),
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
        let controller;
        beforeEach(async () => {
            const module = await testing_1.Test.createTestingModule({
                controllers: [tickets_controller_1.TicketsController],
                providers: [{ provide: tickets_service_1.TicketsService, useValue: ticketServiceMock }, ...guards],
            }).compile();
            controller = module.get(tickets_controller_1.TicketsController);
        });
        it('creates ticket', async () => {
            const dto = { title: 'a', description: 'b', category_id: 'c1' };
            const res = await controller.create(dto, { id: 'u', rol: rol_usuario_enum_1.RolUsuario.CLIENTE });
            expect(res).toEqual({ id: 't1' });
        });
        it('lists tickets', async () => {
            await controller.findAll();
            expect(ticketServiceMock.findAll).toHaveBeenCalled();
        });
        it('changes status', async () => {
            const res = await controller.changeStatus('t1', { status: ticket_entity_1.TicketStatus.IN_PROGRESS }, {
                id: 'tech',
                rol: rol_usuario_enum_1.RolUsuario.TECNICO,
            });
            expect(res.status).toBe(ticket_entity_1.TicketStatus.IN_PROGRESS);
        });
    });
    describe('CategoriesController', () => {
        it('delegates to service', async () => {
            const service = simpleMock({ id: 'cat' });
            const module = await testing_1.Test.createTestingModule({
                controllers: [categories_controller_1.CategoriesController],
                providers: [{ provide: categories_service_1.CategoriesService, useValue: service }, ...guards],
            }).compile();
            const controller = module.get(categories_controller_1.CategoriesController);
            await controller.create({ name: 'cat' });
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
            const module = await testing_1.Test.createTestingModule({
                controllers: [cliente_controller_1.ClienteController],
                providers: [{ provide: cliente_service_1.ClienteService, useValue: service }, ...guards],
            }).compile();
            const controller = module.get(cliente_controller_1.ClienteController);
            await controller.create({ name: 'c', contactEmail: 'a@b.com' });
            await controller.findAll();
            await controller.findOne('id');
            await controller.update('id', { name: 'y' });
            await controller.remove('id');
            expect(service.findAll).toHaveBeenCalled();
        });
    });
    describe('TechniciansController', () => {
        it('delegates to service', async () => {
            const service = simpleMock({ id: 'tech' });
            const module = await testing_1.Test.createTestingModule({
                controllers: [technicians_controller_1.TechniciansController],
                providers: [{ provide: technicians_service_1.TechniciansService, useValue: service }, ...guards],
            }).compile();
            const controller = module.get(technicians_controller_1.TechniciansController);
            await controller.create({ name: 't' });
            await controller.findAll();
            await controller.findOne('id');
            await controller.update('id', { name: 'z' });
            await controller.remove('id');
            expect(service.update).toHaveBeenCalled();
        });
    });
    describe('UsuarioController', () => {
        it('delegates to service', async () => {
            const service = simpleMock({ id: 'user' });
            const module = await testing_1.Test.createTestingModule({
                controllers: [usuario_controller_1.UsuarioController],
                providers: [{ provide: usuario_service_1.UsuarioService, useValue: service }, ...guards],
            }).compile();
            const controller = module.get(usuario_controller_1.UsuarioController);
            await controller.create({ email: 'a', password: 'b', nombre: 'c' });
            await controller.findAll();
            await controller.findOne('id');
            await controller.update('id', { nombre: 'd' });
            await controller.remove('id');
            expect(service.create).toHaveBeenCalled();
        });
    });
    describe('AuthController', () => {
        it('calls auth service methods', async () => {
            const module = await testing_1.Test.createTestingModule({
                controllers: [auth_controller_1.AuthController],
                providers: [{ provide: auth_service_1.AuthService, useValue: authServiceMock }],
            }).compile();
            const controller = module.get(auth_controller_1.AuthController);
            await controller.register({ email: 'x', password: 'y' });
            await controller.login({ email: 'x', password: 'y' });
            await controller.refresh({ refresh_token: 'r' });
            expect(authServiceMock.register).toHaveBeenCalled();
            expect(authServiceMock.login).toHaveBeenCalled();
            expect(authServiceMock.refreshToken).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=controllers.smoke.spec.js.map