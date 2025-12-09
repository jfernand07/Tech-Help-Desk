import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Hardware', description: 'Nombre de la categoría' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'Problemas relacionados con hardware', description: 'Descripción de la categoría', required: false })
    @IsOptional()
    @IsString()
    description?: string;
}
