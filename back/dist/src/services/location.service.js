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
const validator_1 = __importDefault(require("validator"));
const sequelize_1 = require("sequelize");
const service = {
    read: ({ LocationModel, start, end, offset, limit, id }) => {
        return new Promise((resolve, reject) => {
            return LocationModel.findAndCountAll({
                where: {
                    vehicleID: id,
                    date: {
                        [sequelize_1.Op.lte]: new Date(end),
                        [sequelize_1.Op.gte]: new Date(start),
                    },
                },
                offset: Number(offset),
                limit: Number(limit),
            })
                .then((data) => resolve(data))
                .catch((e) => reject(e));
        });
    },
    update: ({ sequelize, LocationModel, vehicleID, latLong, date }) => {
        return new Promise((resolve, reject) => {
            if (!sequelize || !vehicleID || !latLong || !date) {
                reject({
                    errorCode: 400,
                    message: "Missing parameters",
                });
            }
            if (!validator_1.default.isLatLong(`${latLong[0]}, ${latLong[1]}`)) {
                reject({
                    errorCode: 400,
                    message: "Lat long wrong",
                });
            }
            return (() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const find = yield LocationModel.findOne({
                        where: { vehicleID, date },
                    });
                    if (find) {
                        const { dataValues } = yield find.update({
                            latLong: { type: "Point", coordinates: [latLong[0], latLong[1]] },
                            date,
                        });
                        return resolve({
                            message: `Vehicle location ${dataValues.vehicleID} updated`,
                        });
                    }
                    if (find === null) {
                        const { dataValues } = yield LocationModel.create({
                            vehicleID,
                            latLong: { type: "Point", coordinates: [latLong[0], latLong[1]] },
                            date,
                        });
                        return resolve({
                            message: `Vehicle location ${dataValues.vehicleID} created`,
                        });
                    }
                }
                catch (e) {
                    reject({
                        errorCode: 500,
                        message: "Error DB, please check if vehicle ID exists",
                    });
                }
            }))();
        });
    },
};
exports.default = service;
//# sourceMappingURL=location.service.js.map