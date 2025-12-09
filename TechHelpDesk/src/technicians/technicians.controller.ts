import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TechniciansService } from './technicians.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../usuarios/rol-usuario.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';

@ApiTags('technicians')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('technicians')
export class TechniciansController {
    constructor(private readonly techniciansService: TechniciansService) { }

    @Post()
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Crear técnico' })
    @ApiBody({ type: CreateTechnicianDto })
    create(@Body() createTechnicianDto: CreateTechnicianDto) {
        return this.techniciansService.create(createTechnicianDto);
    }

    @Get()
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Listar técnicos' })
    findAll() {
        return this.techniciansService.findAll();
    }

    @Get(':id')
    @Roles(RolUsuario.ADMIN)
    @ApiParam({ name: 'id', format: 'uuid' })
    @ApiOperation({ summary: 'Consultar técnico' })
    findOne(@Param('id') id: string) {
        return this.techniciansService.findOne(id);
    }

    @Patch(':id')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Actualizar técnico' })
    @ApiBody({ type: UpdateTechnicianDto })
    update(@Param('id') id: string, @Body() updateTechnicianDto: UpdateTechnicianDto) {
        return this.techniciansService.update(id, updateTechnicianDto);
    }

    @Delete(':id')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Eliminar técnico' })
    remove(@Param('id') id: string) {
        return this.techniciansService.remove(id);
    }
}
