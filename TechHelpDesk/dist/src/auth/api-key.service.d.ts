import { Repository } from 'typeorm';
import { ApiKey } from './entities/api-key.entity';
export declare class ApiKeyService {
    private apiKeyRepository;
    constructor(apiKeyRepository: Repository<ApiKey>);
    generateApiKey(name: string, scopes?: string[]): Promise<ApiKey>;
    validateApiKey(key: string): Promise<ApiKey | null>;
    findAll(): Promise<ApiKey[]>;
    revoke(id: string): Promise<void>;
    hasScope(apiKey: ApiKey, requiredScope: string): Promise<boolean>;
}
