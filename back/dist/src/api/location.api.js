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
const location_service_1 = __importDefault(require("../services/location.service"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
module.exports = ({ sequelize, models: { LocationModel } }) => {
    router.put("/", auth_service_1.default.verifyTokenLocation, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { latLong, date }, tokenData: { id }, } = req;
        try {
            const { message } = yield location_service_1.default.update({
                sequelize,
                LocationModel,
                vehicleID: id,
                latLong,
                date,
            });
            res.send(message);
        }
        catch ({ errorCode, message }) {
            res.status(errorCode).send(message);
        }
    }));
    router.get("/:id", auth_service_1.default.verifyToken, ({ query: { start, end, offset, limit }, params: { id } }, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allVehicles = yield location_service_1.default.read({
                LocationModel,
                start,
                end,
                offset,
                limit,
                id,
            });
            res.send(allVehicles);
        }
        catch (e) {
            console.log("e", e);
        }
    }));
    return router;
};
//# sourceMappingURL=location.api.js.map