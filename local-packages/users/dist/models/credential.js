"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const core_1 = require("core");
const CredentialSchema = zod_1.z.object({
    id: (0, core_1.zodEntityIdType)(),
    userId: (0, core_1.zodEntityIdType)(),
    password: zod_1.z.string()
});
;
//# sourceMappingURL=credential.js.map