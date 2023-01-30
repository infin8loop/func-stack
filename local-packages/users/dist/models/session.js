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
exports.logout = exports.createUserSession = exports.requireUser = exports.requireUserId = exports.getUser = exports.getUserId = exports.getSession = exports.sessionStorage = void 0;
const node_1 = require("@remix-run/node");
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
(0, tiny_invariant_1.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
exports.sessionStorage = (0, node_1.createCookieSessionStorage)({
    cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === "production",
    },
});
const USER_SESSION_KEY = "userId";
function getSession(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookie = request.headers.get("Cookie");
        return exports.sessionStorage.getSession(cookie);
    });
}
exports.getSession = getSession;
function getUserId(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield getSession(request);
        const userId = session.get(USER_SESSION_KEY);
        return userId;
    });
}
exports.getUserId = getUserId;
function getUser(userReader, request) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield getUserId(request);
        if (userId === undefined)
            return null;
        const user = yield userReader.readUserById(userId);
        if (user)
            return user;
        throw yield logout(request);
    });
}
exports.getUser = getUser;
function requireUserId(request, redirectTo = new URL(request.url).pathname) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield getUserId(request);
        if (!userId) {
            const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
            throw (0, node_1.redirect)(`/login?${searchParams}`);
        }
        return userId;
    });
}
exports.requireUserId = requireUserId;
function requireUser(userReader, request) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield requireUserId(request);
        const user = yield userReader.readUserById(userId);
        if (user)
            return user;
        throw yield logout(request);
    });
}
exports.requireUser = requireUser;
function createUserSession({ request, userId, remember, redirectTo, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield getSession(request);
        session.set(USER_SESSION_KEY, userId);
        return (0, node_1.redirect)(redirectTo, {
            headers: {
                "Set-Cookie": yield exports.sessionStorage.commitSession(session, {
                    maxAge: remember
                        ? 60 * 60 * 24 * 7 // 7 days
                        : undefined,
                }),
            },
        });
    });
}
exports.createUserSession = createUserSession;
function logout(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield getSession(request);
        return (0, node_1.redirect)("/", {
            headers: {
                "Set-Cookie": yield exports.sessionStorage.destroySession(session),
            },
        });
    });
}
exports.logout = logout;
//# sourceMappingURL=session.js.map