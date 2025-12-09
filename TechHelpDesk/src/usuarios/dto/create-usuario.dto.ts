import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'usuario@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'El email debe ser válido' })
  @MaxLength(100, { message: 'El email no puede exceder 100 caracteres' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario', minLength: 6 })
  @IsString({ message: 'La contraseña debe ser un string' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(255, { message: 'La contraseña no puede exceder 255 caracteres' })
  password: string;

  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  @IsString({ message: 'El nombre debe ser un string' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @ApiProperty({ example: 'Perez', description: 'Apellido del usuario', required: false })
  @IsOptional()
  @IsString({ message: 'El apellido debe ser un string' })
  @MaxLength(100, { message: 'El apellido no puede exceder 100 caracteres' })
  apellido?: string;

  @ApiProperty({ example: '1234567890', description: 'Teléfono del usuario', required: false })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser un string' })
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  telefono?: string;

  @ApiProperty({ example: true, description: 'Estado del usuario', required: false, default: true })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser un booleano' })
  activo?: boolean;

  @ApiProperty({ example: 'CLIENTE', description: 'Rol del usuario', required: false, default: 'CLIENTE' })
  @IsOptional()
  @IsString({ message: 'El rol debe ser un string' })
  @MaxLength(50, { message: 'El rol no puede exceder 50 caracteres' })
  rol?: string;
}
