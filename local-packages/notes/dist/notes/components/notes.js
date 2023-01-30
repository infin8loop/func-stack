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
exports.Notes = exports.loader = void 0;
const react_1 = __importDefault(require("react"));
const node_1 = require("@remix-run/node");
const react_2 = require("@remix-run/react");
const note_1 = require("../models/note");
const users_1 = require("users");
const loader = (noteReader) => ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield (0, users_1.requireUserId)(request);
    const noteListItems = yield (0, note_1.listNotes)(noteReader, userId);
    return (0, node_1.json)({ noteListItems });
});
exports.loader = loader;
function Notes() {
    const data = (0, react_2.useLoaderData)();
    return (react_1.default.createElement("div", { className: "h-full w-80 border-r bg-gray-50" },
        react_1.default.createElement(react_2.Link, { to: "new", className: "block p-4 text-xl text-blue-500" }, "+ New Note"),
        react_1.default.createElement("hr", null),
        data.noteListItems.length === 0 ? (react_1.default.createElement("p", { className: "p-4" }, "No notes yet")) : (react_1.default.createElement("ol", null, data.noteListItems.map((note) => (react_1.default.createElement("li", { key: note.id },
            react_1.default.createElement(react_2.NavLink, { className: ({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`, to: note.id },
                "\uD83D\uDCDD ",
                note.title))))))));
}
exports.Notes = Notes;
//# sourceMappingURL=notes.js.map