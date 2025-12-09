import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolUsuario } from '../usuarios/rol-usuario.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Crear categoría' })
    @ApiBody({ type: CreateCategoryDto })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar categorías' })
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    @ApiParam({ name: 'id', format: 'uuid' })
    @ApiOperation({ summary: 'Consultar categoría' })
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(id);
    }

    @Patch(':id')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Actualizar categoría' })
    @ApiBody({ type: UpdateCategoryDto })
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Eliminar categoría' })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}
