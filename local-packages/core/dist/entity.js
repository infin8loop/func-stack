"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodEntityIdType = exports.entityId = void 0;
const cuid_1 = __importDefault(require("cuid"));
const zod_1 = require("zod");
exports.entityId = cuid_1.default; // or uuid (or nanoId)
const zodEntityIdType = () => zod_1.z.string().cuid(); // or uuid() (no built-in nanoId validation)
exports.zodEntityIdType = zodEntityIdType;
const EntitySchema = zod_1.z.object({
    id: (0, exports.zodEntityIdType)(),
    ttl: zod_1.z.number(),
}).required({ id: true });
//# sourceMappingURL=entity.js.map