"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteIndexPage = void 0;
const react_1 = require("@remix-run/react");
const react_2 = __importDefault(require("react"));
function NoteIndexPage() {
    return (react_2.default.createElement("p", null,
        "No note selected. Select a note on the left, or",
        " ",
        react_2.default.createElement(react_1.Link, { to: "new", className: "text-blue-500 underline" }, "create a new note.")));
}
exports.NoteIndexPage = NoteIndexPage;
//# sourceMappingURL=index.js.map