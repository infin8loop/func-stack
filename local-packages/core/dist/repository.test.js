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
const vitest_1 = require("vitest");
const repository_1 = require("./repository");
(0, vitest_1.describe)("RepositoryBase", () => {
    class RepoTest extends repository_1.RepositoryBase {
        constructor(readValue, schema) {
            super(schema);
            this.readValue = readValue;
        }
        read(id) {
            return new Promise((resolve) => {
                resolve(this.readWithSchema(this.readValue));
            });
        }
        list(filter) {
            throw new Error("Method not implemented.");
        }
        delete(id) {
            throw new Error("Method not implemented.");
        }
    }
    (0, vitest_1.test)("works without schema", () => __awaiter(void 0, void 0, void 0, function* () {
        const expected = {};
        const repo = new RepoTest(expected);
        const unexpected = {};
        (0, vitest_1.expect)(expected).not.toBe(unexpected);
        const testEach = (value) => {
            (0, vitest_1.expect)(value).toEqual(expected);
            (0, vitest_1.expect)(value).toBe(expected);
        };
        testEach(yield repo.create(expected));
        testEach(yield repo.update(expected));
        testEach(yield repo.upsert(expected));
        testEach(yield repo.read('an_id'));
    }));
    const ID_REQUIRED_ERROR = "Entity.id value is required.";
    class SchemaTest {
        parse(data) {
            if (data && data.id)
                return data;
            else
                throw new Error(ID_REQUIRED_ERROR);
        }
    }
    (0, vitest_1.test)("works with schema", () => __awaiter(void 0, void 0, void 0, function* () {
        const schema = new SchemaTest();
        const expected = { id: "one" };
        const repo = new RepoTest(expected, schema);
        const unexpected = { id: "one" };
        const invalid = { identity: "ONE" };
        (0, vitest_1.expect)(expected).not.toBe(unexpected);
        const testEach = (value) => {
            (0, vitest_1.expect)(value).toEqual(expected);
            (0, vitest_1.expect)(value).toBe(expected);
        };
        testEach(yield repo.create(expected));
        testEach(yield repo.update(expected));
        testEach(yield repo.upsert(expected));
        testEach(yield repo.read("One"));
        (0, vitest_1.expect)(() => repo.create(invalid)).toThrow(ID_REQUIRED_ERROR);
        (0, vitest_1.expect)(() => repo.update(invalid)).toThrow(ID_REQUIRED_ERROR);
        (0, vitest_1.expect)(() => repo.upsert(invalid)).toThrow(ID_REQUIRED_ERROR);
    }));
});
//# sourceMappingURL=repository.test.js.map