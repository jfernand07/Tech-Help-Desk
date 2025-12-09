import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../usuarios/usuario.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RolUsuario } from '../usuarios/rol-usuario.enum';
export declare class AuthService {
    private usuarioService;
    private jwtService;
    private configService;
    constructor(usuarioService: UsuarioService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: any;
            email: any;
            nombre: any;
            rol: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        nombre: string;
        apellido: string;
        telefono: string;
        activo: boolean;
        rol: RolUsuario;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
    googleLogin(googleUser: any): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            nombre: string;
            rol: RolUsuario;
        };
    }>;
}
