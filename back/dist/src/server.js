"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const { BACK_PORT } = process.env;
app_1.default.listen(BACK_PORT, () => console.log(`server is listening ${BACK_PORT}`));
//# sourceMappingURL=server.js.map