import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        nombre: string;
        apellido: string;
        telefono: string;
        activo: boolean;
        rol: import("../usuarios/rol-usuario.enum").RolUsuario;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    googleAuth(): void;
    googleAuthRedirect(req: any, res: any): Promise<void>;
}
