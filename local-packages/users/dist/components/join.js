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
exports.Join = exports.meta = exports.action = exports.loader = void 0;
const node_1 = require("@remix-run/node");
const react_1 = require("@remix-run/react");
const React = __importStar(require("react"));
const session_1 = require("../models/session");
const user_1 = require("../models/user");
const utils_1 = require("../utils");
const loader = ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield (0, session_1.getUserId)(request);
    if (userId)
        return (0, node_1.redirect)("/");
    return (0, node_1.json)({});
});
exports.loader = loader;
const action = (userReader, userWriter, credentialWriter) => ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = yield request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const redirectTo = (0, utils_1.safeRedirect)(formData.get("redirectTo"), "/");
    if (!(0, utils_1.validateEmail)(email)) {
        return (0, node_1.json)({ errors: { email: "Email is invalid" } }, { status: 400 });
    }
    if (typeof password !== "string" || password.length === 0) {
        return (0, node_1.json)({ errors: { password: "Password is required" } }, { status: 400 });
    }
    if (password.length < 8) {
        return (0, node_1.json)({ errors: { password: "Password is too short" } }, { status: 400 });
    }
    const existingUser = yield (0, user_1.getUserByEmail)(userReader, email);
    if (existingUser) {
        return (0, node_1.json)({ errors: { email: "A user already exists with this email" } }, { status: 400 });
    }
    const user = yield (0, user_1.createUser)(userReader, userWriter, credentialWriter, email, password);
    return (0, session_1.createUserSession)({
        request,
        userId: user.id,
        remember: false,
        redirectTo,
    });
});
exports.action = action;
const meta = () => {
    return {
        title: "Sign Up",
    };
};
exports.meta = meta;
function Join() {
    var _a, _b, _c, _d, _e;
    const [searchParams] = (0, react_1.useSearchParams)();
    const redirectTo = (_a = searchParams.get("redirectTo")) !== null && _a !== void 0 ? _a : undefined;
    const actionData = (0, react_1.useActionData)();
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    React.useEffect(() => {
        var _a, _b, _c, _d;
        if ((_a = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _a === void 0 ? void 0 : _a.email) {
            (_b = emailRef.current) === null || _b === void 0 ? void 0 : _b.focus();
        }
        else if ((_c = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _c === void 0 ? void 0 : _c.password) {
            (_d = passwordRef.current) === null || _d === void 0 ? void 0 : _d.focus();
        }
    }, [actionData]);
    return (React.createElement("div", { className: "flex min-h-full flex-col justify-center" },
        React.createElement("div", { className: "mx-auto w-full max-w-md px-8" },
            React.createElement(react_1.Form, { method: "post", className: "space-y-6", noValidate: true },
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700" }, "Email address"),
                    React.createElement("div", { className: "mt-1" },
                        React.createElement("input", { ref: emailRef, id: "email", required: true, autoFocus: true, name: "email", type: "email", autoComplete: "email", "aria-invalid": ((_b = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _b === void 0 ? void 0 : _b.email) ? true : undefined, "aria-describedby": "email-error", className: "w-full rounded border border-gray-500 px-2 py-1 text-lg" }),
                        ((_c = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _c === void 0 ? void 0 : _c.email) && (React.createElement("div", { className: "pt-1 text-red-700", id: "email-error" }, actionData.errors.email)))),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700" }, "Password"),
                    React.createElement("div", { className: "mt-1" },
                        React.createElement("input", { id: "password", ref: passwordRef, name: "password", type: "password", autoComplete: "new-password", "aria-invalid": ((_d = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _d === void 0 ? void 0 : _d.password) ? true : undefined, "aria-describedby": "password-error", className: "w-full rounded border border-gray-500 px-2 py-1 text-lg" }),
                        ((_e = actionData === null || actionData === void 0 ? void 0 : actionData.errors) === null || _e === void 0 ? void 0 : _e.password) && (React.createElement("div", { className: "pt-1 text-red-700", id: "password-error" }, actionData.errors.password)))),
                React.createElement("input", { type: "hidden", name: "redirectTo", value: redirectTo }),
                React.createElement("button", { type: "submit", className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400" }, "Create Account"),
                React.createElement("div", { className: "flex items-center justify-center" },
                    React.createElement("div", { className: "text-center text-sm text-gray-500" },
                        "Already have an account?",
                        " ",
                        React.createElement(react_1.Link, { className: "text-blue-500 underline", to: {
                                pathname: "/login",
                                search: searchParams.toString(),
                            } }, "Log in")))))));
}
exports.Join = Join;
//# sourceMappingURL=join.js.map