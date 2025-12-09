import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../../usuarios/usuario.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usuarioService;
    constructor(configService: ConfigService, usuarioService: UsuarioService);
    validate(payload: any): Promise<{
        id: string;
        email: string;
        rol: import("../../usuarios/rol-usuario.enum").RolUsuario;
        nombre: string;
    }>;
}
export {};
