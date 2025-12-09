import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyService } from '../api-key.service';
export declare class ScopesGuard implements CanActivate {
    private reflector;
    private apiKeyService;
    constructor(reflector: Reflector, apiKeyService: ApiKeyService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
