"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_service_1 = require("./usuario.service");
const usuario_entity_1 = require("./entities/usuario.entity");
describe('UsuarioService', () => {
    let service;
    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                usuario_service_1.UsuarioService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(usuario_entity_1.Usuario),
                    useValue: mockRepository,
                },
            ],
        }).compile();
        service = module.get(usuario_service_1.UsuarioService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('findAll', () => {
        it('should return an array of usuarios', async () => {
            const usuarios = [{ id: '1', email: 'test@example.com', nombre: 'Test' }];
            mockRepository.find.mockResolvedValue(usuarios);
            expect(await service.findAll()).toEqual(usuarios);
            expect(mockRepository.find).toHaveBeenCalled();
        });
    });
    describe('findOne', () => {
        it('should return a usuario by id', async () => {
            const usuario = { id: '1', email: 'test@example.com' };
            mockRepository.findOne.mockResolvedValue(usuario);
            expect(await service.findOne('1')).toEqual(usuario);
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
        });
    });
});
//# sourceMappingURL=usuario.service.spec.js.map