"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
describe('AppController', () => {
    let appController;
    beforeEach(async () => {
        const app = await testing_1.Test.createTestingModule({
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        }).compile();
        appController = app.get(app_controller_1.AppController);
    });
    describe('root', () => {
        it('should return welcome message', () => {
            expect(appController.getHello()).toBe('Bienvenido a Tech Help Desk API - Backend NestJS');
        });
    });
    describe('health', () => {
        it('should return health status', () => {
            const health = appController.getHealth();
            expect(health.status).toBe('ok');
            expect(health.message).toContain('Help Desk API');
        });
    });
});
//# sourceMappingURL=app.controller.spec.js.map