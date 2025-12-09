"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUsuarioDto {
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'usuario@example.com', description: 'Correo electrónico del usuario' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El email debe ser válido' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El email no puede exceder 100 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123', description: 'Contraseña del usuario', minLength: 6 }),
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser un string' }),
    (0, class_validator_1.MinLength)(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    (0, class_validator_1.MaxLength)(255, { message: 'La contraseña no puede exceder 255 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan', description: 'Nombre del usuario' }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser un string' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El nombre no puede exceder 100 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Perez', description: 'Apellido del usuario', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El apellido debe ser un string' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El apellido no puede exceder 100 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "apellido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1234567890', description: 'Teléfono del usuario', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El teléfono debe ser un string' }),
    (0, class_validator_1.MaxLength)(20, { message: 'El teléfono no puede exceder 20 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Estado del usuario', required: false, default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'El campo activo debe ser un booleano' }),
    __metadata("design:type", Boolean)
], CreateUsuarioDto.prototype, "activo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CLIENTE', description: 'Rol del usuario', required: false, default: 'CLIENTE' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El rol debe ser un string' }),
    (0, class_validator_1.MaxLength)(50, { message: 'El rol no puede exceder 50 caracteres' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "rol", void 0);
//# sourceMappingURL=create-usuario.dto.js.map