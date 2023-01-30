"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.NewNotePage = exports.action = void 0;
const node_1 = require("@remix-run/node");
const react_1 = require("@remix-run/react");
const core_1 = require("core");
const note_1 = require("../models/note");
const React = __importStar(require("react"));
const react_2 = require("react");
const action = (noteWriter, userId, redirectPath = "/notes") => {
    return (({ request }) => __awaiter(void 0, void 0, void 0, function* () {
        const formData = yield request.formData();
        const title = formData.get("title");
        const body = formData.get("body");
        if (typeof title !== "string" || title.length === 0) {
            return (0, node_1.json)({ errors: { title: "Title is required" } }, { status: 400 });
        }
        if (typeof body !== "string" || body.length === 0) {
            return (0, node_1.json)({ errors: { body: "Body is required" } }, { status: 400 });
        }
        const note = yield (0, note_1.createNote)(noteWriter, { id: (0, core_1.entityId)(), title, body, userId });
        return (0, node_1.redirect)(`${redirectPath}${redirectPath.endsWith("/") ? "" : "/"}${note.id}`);
    }));
};
exports.action = action;
function NewNotePage() {
    var _a, _b, _c, _d, _e, _f;
    const actionData = (0, react_1.useActionData)();
    const titleRef = (0, react_2.useRef)(null);
    const bodyRef = React.useRef(null);
    React.useEffect(() => {
        var _a, _b, _c, _d;
        if ((_a = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _a === void 0 ? void 0 : _a.title) {
            (_b = titleRef.current) === null || _b === void 0 ? void 0 : _b.focus();
        }
        else if ((_c = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _c === void 0 ? void 0 : _c.body) {
            (_d = bodyRef.current) === null || _d === void 0 ? void 0 : _d.focus();
        }
    }, [actionData]);
    return (React.createElement(react_1.Form, { method: "post", style: {
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: "100%",
        } },
        React.createElement("div", null,
            React.createElement("label", { className: "flex w-full flex-col gap-1" },
                React.createElement("span", null, "Title: "),
                React.createElement("input", { ref: titleRef, name: "title", className: "flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose", "aria-invalid": ((_a = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _a === void 0 ? void 0 : _a.title) ? true : undefined, "aria-errormessage": ((_b = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _b === void 0 ? void 0 : _b.title) ? "title-error" : undefined })),
            ((_c = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _c === void 0 ? void 0 : _c.title) && (React.createElement("div", { className: "pt-1 text-red-700", id: "title-error" }, actionData.errors.title))),
        React.createElement("div", null,
            React.createElement("label", { className: "flex w-full flex-col gap-1" },
                React.createElement("span", null, "Body: "),
                React.createElement("textarea", { ref: bodyRef, name: "body", rows: 8, className: "w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6", "aria-invalid": ((_d = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _d === void 0 ? void 0 : _d.body) ? true : undefined, "aria-errormessage": ((_e = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _e === void 0 ? void 0 : _e.body) ? "body-error" : undefined })),
            ((_f = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _f === void 0 ? void 0 : _f.body) && (React.createElement("div", { className: "pt-1 text-red-700", id: "body-error" }, actionData.errors.body))),
        React.createElement("div", { className: "text-right" },
            React.createElement("button", { type: "submit", className: "rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400" }, "Save"))));
}
exports.NewNotePage = NewNotePage;
//# sourceMappingURL=new.js.map