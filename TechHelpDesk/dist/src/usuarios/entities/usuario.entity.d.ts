import { RolUsuario } from '../rol-usuario.enum';
export declare class Usuario {
    id: string;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    telefono: string;
    activo: boolean;
    rol: RolUsuario;
    createdAt: Date;
    updatedAt: Date;
}
