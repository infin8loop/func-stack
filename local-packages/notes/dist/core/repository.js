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
exports.RepositoryBase = void 0;
;
class RepositoryBase {
    constructor(schema = null) {
        this.schema = schema;
    }
    query(query, parameters) {
        throw new Error("Method not implemented.");
    }
    parse(data) {
        var _a;
        const result = ((_a = this.schema) === null || _a === void 0 ? void 0 : _a.parse(data)) || data;
        return new Promise((resolve) => resolve(result));
    }
    readWithSchema(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // const data: T | null = await this.read(id);
            try {
                return data !== null ? yield this.parse(data) : data;
            }
            catch (error) {
                error.data = data;
                throw error;
            }
        });
    }
    create(item) {
        return this.parse(item);
    }
    update(item) {
        return this.parse(item);
    }
    upsert(item) {
        return this.parse(item);
    }
}
exports.RepositoryBase = RepositoryBase;
/* IDEAS:

export interface Filter {
  where: Where
}

interface Predicate {
  [index: string]: Operator;
}

export interface Where {
  AND?: ReadonlyArray<Predicate>;
  OR?: ReadonlyArray<Predicate>
  NOT?: ReadonlyArray<Predicate>
}

export interface Operator {
  equals?: Scalar
  lt?: Scalar
  lte?: Scalar
  gt?: Scalar
  gte?: Scalar
}
*/ 
//# sourceMappingURL=repository.js.map