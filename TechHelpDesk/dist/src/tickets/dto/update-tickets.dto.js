"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTicketDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_tickets_dto_1 = require("./create-tickets.dto");
class UpdateTicketDto extends (0, swagger_1.PartialType)(create_tickets_dto_1.CreateTicketDto) {
}
exports.UpdateTicketDto = UpdateTicketDto;
//# sourceMappingURL=update-tickets.dto.js.map