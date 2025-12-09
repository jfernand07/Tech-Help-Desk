import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateTechnicianDto {
    @ApiProperty({ example: 'Carlos Ruiz', description: 'Nombre del técnico' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'Redes', description: 'Especialidad del técnico' })
    @IsString()
    @MaxLength(100)
    specialty: string;

    @ApiProperty({ example: true, description: 'Disponibilidad del técnico', required: false, default: true })
    @IsOptional()
    @IsBoolean()
    availability?: boolean;

    @ApiProperty({ format: 'uuid', description: 'ID del usuario asociado', required: false })
    @IsOptional()
    @IsUUID()
    usuario_id?: string;
}
