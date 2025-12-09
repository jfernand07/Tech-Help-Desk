"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const ticket_entity_1 = require("../tickets/entities/ticket.entity");
const cliente_entity_1 = require("../cliente/entities/cliente.entity");
const technician_entity_1 = require("../technicians/entities/technician.entity");
const category_entity_1 = require("../categories/entities/category.entity");
(0, dotenv_1.config)();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'tech_helpdesk',
    entities: [usuario_entity_1.Usuario, cliente_entity_1.Cliente, technician_entity_1.Technician, category_entity_1.Category, ticket_entity_1.Ticket],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: process.env.DB_LOGGING === 'true',
});
//# sourceMappingURL=typeorm.config.js.map