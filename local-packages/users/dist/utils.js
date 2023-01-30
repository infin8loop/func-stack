"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.safeRedirect = void 0;
const DEFAULT_REDIRECT = "/";
/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
    if (!to || typeof to !== "string") {
        return defaultRedirect;
    }
    if (!to.startsWith("/") || to.startsWith("//")) {
        return defaultRedirect;
    }
    return to;
}
exports.safeRedirect = safeRedirect;
function validateEmail(email) {
    return typeof email === "string" && email.length > 3 && email.includes("@");
}
exports.validateEmail = validateEmail;
//# sourceMappingURL=utils.js.map