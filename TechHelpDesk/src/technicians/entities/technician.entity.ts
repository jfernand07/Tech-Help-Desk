import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity('technicians')
// Entidad de técnico vinculada a usuario con rol TECNICO
export class Technician {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    specialty: string;

    @Column({ type: 'boolean', default: true })
    availability: boolean;

    @OneToOne(() => Usuario, { nullable: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Column({ type: 'uuid', nullable: true })
    usuario_id: string;

    @OneToMany(() => Ticket, ticket => ticket.technician)
    tickets: Ticket[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
