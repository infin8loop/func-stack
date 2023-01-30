"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosUserRepository = void 0;
const core_1 = require("core");
class CosmosUserRepository extends core_1.CosmosRepository {
    readUserById(id) {
        throw new Error("Method not implemented.");
    }
    readUserByEmail(email) {
        throw new Error("Method not implemented.");
    }
    list(filter) {
        throw new Error("Method not implemented.");
    }
    query(query, parameters) {
        throw new Error("Method not implemented.");
    }
}
exports.CosmosUserRepository = CosmosUserRepository;
//# sourceMappingURL=cosmos.js.map