import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { TicketPriority } from '../entities/ticket.entity';

export class CreateTicketDto {
  @ApiProperty({ example: 'Error al iniciar sesión' })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'No puedo acceder con mi cuenta corporativa' })
  @IsString()
  description: string;

  @ApiProperty({ enum: TicketPriority, default: TicketPriority.MEDIUM })
  @IsEnum(TicketPriority)
  priority: TicketPriority = TicketPriority.MEDIUM;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  category_id: string;

  @ApiProperty({ format: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  client_id?: string;

  @ApiProperty({ format: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  technician_id?: string;
}
