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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLogin = exports.deleteUser = exports.createUser = exports.getUserPasswordByEmail = exports.getUserByEmail = exports.getUserById = void 0;
// import arc from "@architect/functions";
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const zod_1 = require("zod");
const core_1 = require("core");
const UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
;
function getUserById(userReader, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userReader.readUserById(id);
    });
}
exports.getUserById = getUserById;
function getUserByEmail(userReader, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userReader.readUserByEmail(email);
    });
}
exports.getUserByEmail = getUserByEmail;
function getUserPasswordByEmail(credentialReader, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield credentialReader.readByEmail(email);
    });
}
exports.getUserPasswordByEmail = getUserPasswordByEmail;
function createUser(userReader, userWriter, credentialWriter, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = {
            id: (0, core_1.entityId)(),
            email: email
        };
        yield credentialWriter.create({
            id: (0, core_1.entityId)(),
            userId: user.id,
            password: hashedPassword
        });
        yield userWriter.create(user);
        const createdUser = yield userReader.readUserByEmail(email);
        (0, tiny_invariant_1.default)(createdUser, `User not found after being created. This should not happen`);
        return createdUser;
    });
}
exports.createUser = createUser;
function deleteUser(userReader, userWriter, credentialReader, credentialWriter, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userReader.readUserByEmail(email);
        yield userWriter.delete(user.id);
        const credential = yield credentialReader.readByUserId(user.id);
        yield credentialWriter.delete(credential.id);
    });
}
exports.deleteUser = deleteUser;
function verifyLogin(userReader, credentialReader, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const Credential = yield credentialReader.readByEmail(email);
        if (!Credential) {
            return undefined;
        }
        const isValid = yield bcryptjs_1.default.compare(password, Credential.password);
        if (!isValid) {
            return undefined;
        }
        return yield userReader.readUserByEmail(email);
    });
}
exports.verifyLogin = verifyLogin;
//# sourceMappingURL=user.js.map