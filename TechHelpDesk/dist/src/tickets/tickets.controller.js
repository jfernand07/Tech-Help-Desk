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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tickets_service_1 = require("./tickets.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const rol_usuario_enum_1 = require("../usuarios/rol-usuario.enum");
const roles_guard_1 = require("../auth/guards/roles.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_tickets_dto_1 = require("./dto/create-tickets.dto");
const update_tickets_dto_1 = require("./dto/update-tickets.dto");
const update_ticket_status_dto_1 = require("./dto/update-ticket-status.dto");
const ticket_entity_1 = require("./entities/ticket.entity");
let TicketsController = class TicketsController {
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    create(createTicketDto, user) {
        return this.ticketsService.create(createTicketDto, user);
    }
    findAll() {
        return this.ticketsService.findAll();
    }
    findByClient(id, user) {
        return this.ticketsService.findByClient(id, user);
    }
    findByTechnician(id, user) {
        return this.ticketsService.findByTechnician(id, user);
    }
    findOne(id, user) {
        return this.ticketsService.findOneSecure(id, user);
    }
    update(id, updateTicketDto) {
        return this.ticketsService.update(id, updateTicketDto);
    }
    changeStatus(id, updateStatusDto, user) {
        return this.ticketsService.changeStatus(id, updateStatusDto.status, user);
    }
    remove(id) {
        return this.ticketsService.remove(id);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuario.CLIENTE, rol_usuario_enum_1.RolUsuario.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un ticket' }),
    (0, swagger_1.ApiBody)({ type: create_tickets_dto_1.CreateTicketDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: ticket_entity_1.Ticket }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tickets_dto_1.CreateTicketDto, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuario.ADMIN, rol_usuario_enum_1.RolUsuario.TECNICO),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los tickets' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('client/:id'),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuario.ADMIN, rol_usuario_enum_1.RolUsuario.CLIENTE),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar historial de tickets por cliente' }),
    (0, swagger_1.ApiParam)({ name: 'id', format: 'uuid' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findByClient", null);
__decorate([
    (0, common_1.Get)('technician/:id'),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuario.ADMIN, rol_usuario_enum_1.RolUsuario.TECNICO),
    (0, swagger_1.ApiOperation)({ summary: 'Listar tickets asignados a un técnico' }),
    (0, swagger_1.ApiParam)({ name: 'id', format: 'uuid' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findByTechnician", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar un ticket por id' }),
    (0, swagger_1.ApiParam)({ name: 'id', format: 'uuid' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuario.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar información del ticket' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tickets_dto_1.UpdateTicketDto]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuario.ADMIN, rol_usuario_enum_1.RolUsuario.TECNICO),
    (0, swagger_1.ApiOperation)({ summary: 'Cambiar el estado del ticket' }),
    (0, swagger_1.ApiBody)({ type: update_ticket_status_dto_1.UpdateTicketStatusDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ticket_status_dto_1.UpdateTicketStatusDto, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuario.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar ticket' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "remove", null);
exports.TicketsController = TicketsController = __decorate([
    (0, swagger_1.ApiTags)('tickets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map