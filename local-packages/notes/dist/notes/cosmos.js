"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmosNoteRepository = void 0;
const core_1 = require("core");
class CosmosNoteRepository extends core_1.CosmosRepository {
    list(filter) {
        const _super = Object.create(null, {
            query: { get: () => super.query },
            containerName: { get: () => super.containerName }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.query.call(this, `select * from ${_super.containerName} where userId=@userId`, filter);
        });
    }
}
exports.CosmosNoteRepository = CosmosNoteRepository;
//# sourceMappingURL=cosmos.js.map