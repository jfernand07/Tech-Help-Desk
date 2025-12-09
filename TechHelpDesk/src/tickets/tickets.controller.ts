import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../usuarios/rol-usuario.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTicketDto } from './dto/create-tickets.dto';
import { UpdateTicketDto } from './dto/update-tickets.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { Ticket } from './entities/ticket.entity';

@ApiTags('tickets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @Roles(RolUsuario.CLIENTE, RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Crear un ticket' })
  @ApiBody({ type: CreateTicketDto })
  @ApiResponse({ status: 201, type: Ticket })
  create(@Body() createTicketDto: CreateTicketDto, @CurrentUser() user: any) {
    return this.ticketsService.create(createTicketDto, user);
  }

  @Get()
  @Roles(RolUsuario.ADMIN, RolUsuario.TECNICO)
  @ApiOperation({ summary: 'Listar todos los tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get('client/:id')
  @Roles(RolUsuario.ADMIN, RolUsuario.CLIENTE)
  @ApiOperation({ summary: 'Consultar historial de tickets por cliente' })
  @ApiParam({ name: 'id', format: 'uuid' })
  findByClient(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ticketsService.findByClient(id, user);
  }

  @Get('technician/:id')
  @Roles(RolUsuario.ADMIN, RolUsuario.TECNICO)
  @ApiOperation({ summary: 'Listar tickets asignados a un técnico' })
  @ApiParam({ name: 'id', format: 'uuid' })
  findByTechnician(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ticketsService.findByTechnician(id, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar un ticket por id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ticketsService.findOneSecure(id, user);
  }

  @Patch(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Actualizar información del ticket' })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Patch(':id/status')
  @Roles(RolUsuario.ADMIN, RolUsuario.TECNICO)
  @ApiOperation({ summary: 'Cambiar el estado del ticket' })
  @ApiBody({ type: UpdateTicketStatusDto })
  changeStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateTicketStatusDto,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.changeStatus(id, updateStatusDto.status, user);
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Eliminar ticket' })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
