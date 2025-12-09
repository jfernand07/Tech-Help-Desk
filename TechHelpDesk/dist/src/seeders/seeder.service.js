"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const cliente_entity_1 = require("../cliente/entities/cliente.entity");
const rol_usuario_enum_1 = require("../usuarios/rol-usuario.enum");
const bcrypt = __importStar(require("bcrypt"));
let SeederService = class SeederService {
    constructor(usuarioRepository, clienteRepository) {
        this.usuarioRepository = usuarioRepository;
        this.clienteRepository = clienteRepository;
    }
    async seed() {
        console.log(' Iniciando seeders...');
        await this.seedUsuarios();
        await this.seedClientes();
        console.log(' Seeders completados');
    }
    async seedUsuarios() {
        const usuarios = [
            {
                email: 'admin@riwi.com',
                password: await bcrypt.hash('admin123', 10),
                nombre: 'Admin',
                apellido: 'Sistema',
                rol: rol_usuario_enum_1.RolUsuario.ADMIN,
                activo: true,
            },
            {
                email: 'cliente@riwi.com',
                password: await bcrypt.hash('cliente123', 10),
                nombre: 'Cliente',
                apellido: 'Demo',
                rol: rol_usuario_enum_1.RolUsuario.CLIENTE,
                activo: true,
            },
            {
                email: 'tecnico@riwi.com',
                password: await bcrypt.hash('tecnico123', 10),
                nombre: 'Tecnico',
                apellido: 'Soporte',
                rol: rol_usuario_enum_1.RolUsuario.TECNICO,
                activo: true,
            },
        ];
        for (const usuarioData of usuarios) {
            const existe = await this.usuarioRepository.findOne({
                where: { email: usuarioData.email },
            });
            if (!existe) {
                const usuario = this.usuarioRepository.create(usuarioData);
                await this.usuarioRepository.save(usuario);
                console.log(`Usuario creado: ${usuarioData.email}`);
            }
        }
    }
    async seedClientes() {
        const clienteUsuario = await this.usuarioRepository.findOne({
            where: { email: 'cliente@riwi.com' },
        });
        if (!clienteUsuario)
            return;
        const clientes = [
            {
                name: 'Cliente Demo',
                company: 'Riwi Tech',
                contactEmail: 'cliente@riwi.com',
                usuario: clienteUsuario,
            },
        ];
        for (const clienteData of clientes) {
            const existe = await this.clienteRepository.findOne({
                where: { contactEmail: clienteData.contactEmail },
            });
            if (!existe) {
                const cliente = this.clienteRepository.create(clienteData);
                await this.clienteRepository.save(cliente);
                console.log(` Cliente creado: ${clienteData.contactEmail}`);
            }
        }
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(cliente_entity_1.Cliente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SeederService);
//# sourceMappingURL=seeder.service.js.map