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
exports.CatchBoundary = exports.ErrorBoundary = exports.NoteDeatilsPage = exports.action = exports.loader = void 0;
const node_1 = require("@remix-run/node");
const react_1 = require("@remix-run/react");
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const note_1 = require("../models/note");
const react_2 = __importDefault(require("react"));
// TODO: add userId as parameter
const loader = (reader) => {
    return (({ request, params }) => __awaiter(void 0, void 0, void 0, function* () {
        // const userId = await requireUserId(request);
        (0, tiny_invariant_1.default)(params.noteId, "noteId not found");
        // const note = await getNote({ userId, id: params.noteId });
        const note = yield (0, note_1.readNote)(reader, params.noteId);
        if (!note) {
            throw new Response("Not Found", { status: 404 });
        }
        return (0, node_1.json)(note);
    }));
};
exports.loader = loader;
// TODO: add userId as parameter
const action = (writer, redirectUrl = "/notes") => {
    return (({ request, params }) => __awaiter(void 0, void 0, void 0, function* () {
        // const userId = await requireUserId(request);  // TODO: include userId (in ID?)
        (0, tiny_invariant_1.default)(params.noteId, "noteId not found");
        yield (0, note_1.deleteNote)(writer, params.noteId);
        return (0, node_1.redirect)(redirectUrl);
    }));
};
exports.action = action;
function NoteDeatilsPage() {
    const note = (0, react_1.useLoaderData)();
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h3", { className: "text-2xl font-bold" }, note.title),
        react_2.default.createElement("p", { className: "py-6" }, note.body),
        react_2.default.createElement("hr", { className: "my-4" }),
        react_2.default.createElement(react_1.Form, { method: "post" },
            react_2.default.createElement("button", { type: "submit", className: "rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400" }, "Delete"))));
}
exports.NoteDeatilsPage = NoteDeatilsPage;
function ErrorBoundary({ error }) {
    console.error(error);
    return react_2.default.createElement("div", null,
        "An unexpected error occurred: ",
        error.message);
}
exports.ErrorBoundary = ErrorBoundary;
function CatchBoundary() {
    const caught = (0, react_1.useCatch)();
    if (caught.status === 404) {
        return react_2.default.createElement("div", null, "Note not found");
    }
    throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
exports.CatchBoundary = CatchBoundary;
//# sourceMappingURL=$noteId.js.map