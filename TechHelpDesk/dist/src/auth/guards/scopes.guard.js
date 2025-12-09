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
exports.ScopesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const scopes_decorator_1 = require("../decorators/scopes.decorator");
const api_key_service_1 = require("../api-key.service");
let ScopesGuard = class ScopesGuard {
    constructor(reflector, apiKeyService) {
        this.reflector = reflector;
        this.apiKeyService = apiKeyService;
    }
    async canActivate(context) {
        const requiredScopes = this.reflector.getAllAndOverride(scopes_decorator_1.SCOPES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredScopes) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const apiKey = request.apiKey;
        if (!apiKey) {
            throw new common_1.ForbiddenException('API Key requerida para este endpoint');
        }
        for (const scope of requiredScopes) {
            const hasScope = await this.apiKeyService.hasScope(apiKey, scope);
            if (!hasScope) {
                throw new common_1.ForbiddenException(`Permiso insuficiente. Se requiere el scope: ${scope}`);
            }
        }
        return true;
    }
};
exports.ScopesGuard = ScopesGuard;
exports.ScopesGuard = ScopesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        api_key_service_1.ApiKeyService])
], ScopesGuard);
//# sourceMappingURL=scopes.guard.js.map