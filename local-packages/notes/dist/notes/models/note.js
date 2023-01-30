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
exports.listNotes = exports.deleteNote = exports.createNote = exports.readNote = void 0;
const core_1 = require("core");
const zod_1 = require("zod");
const NoteSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    title: zod_1.z.string(),
    body: zod_1.z.string()
});
function readNote(reader, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reader.read(id);
    });
}
exports.readNote = readNote;
function createNote(writer, note) {
    return __awaiter(this, void 0, void 0, function* () {
        note.id = (0, core_1.entityId)();
        return yield writer.create(note);
    });
}
exports.createNote = createNote;
function deleteNote(writer, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield writer.delete(id);
    });
}
exports.deleteNote = deleteNote;
function listNotes(reader, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield reader.list({ userId });
    });
}
exports.listNotes = listNotes;
//# sourceMappingURL=note.js.map