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
const router = require("express").Router();
const vehicle_service_1 = __importDefault(require("../services/vehicle.service"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
module.exports = ({ sequelize, models: { VehicleModel } }) => {
    router.post("/", auth_service_1.default.verifyToken, ({ body: { id } }, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { message } = yield vehicle_service_1.default.create({
                VehicleModel,
                id,
            });
            res.send(message);
        }
        catch ({ errorCode, message }) {
            res.status(errorCode).send(message);
        }
    }));
    router.get("/", auth_service_1.default.verifyToken, ({ query: { offset, limit } }, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("---", auth_service_1.default.signToken(45214));
        try {
            const { message } = yield vehicle_service_1.default.readAll({
                VehicleModel,
                offset,
                limit,
            });
            res.send(message);
        }
        catch (e) {
            console.log("e", e);
        }
    }));
    return router;
};
//# sourceMappingURL=vehicle.api.js.map