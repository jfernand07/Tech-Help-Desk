"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("./../src/app.module");
describe('AuthController (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    describe('/auth/register (POST)', () => {
        it('should register a new user', async () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: `test${Date.now()}@example.com`,
                password: 'password123',
                nombre: 'Test',
            })
                .expect(201);
        });
        it('should fail with invalid email', () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'invalid-email',
                password: 'password123',
                nombre: 'Test',
            })
                .expect(400);
        });
    });
    describe('/auth/login (POST)', () => {
        it('should login with valid credentials', async () => {
            const email = `login${Date.now()}@example.com`;
            await (0, supertest_1.default)(app.getHttpServer()).post('/auth/register').send({
                email,
                password: 'password123',
                nombre: 'Login',
            });
            return (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send({
                email,
                password: 'password123',
            })
                .expect(200)
                .expect(res => {
                expect(res.body).toHaveProperty('access_token');
                expect(res.body).toHaveProperty('refresh_token');
            });
        });
        it('should fail with invalid credentials', () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'nonexistent@example.com',
                password: 'wrongpassword',
            })
                .expect(401);
        });
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map