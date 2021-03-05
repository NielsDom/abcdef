"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service = {
    create: ({ VehicleModel, id }) => {
        return new Promise((resolve, reject) => VehicleModel.create({
            id,
        })
            .then((data) => resolve({ message: data }))
            .catch(({ errors }) => reject({
            errorCode: 500,
            message: errors,
        })));
    },
    readAll: ({ VehicleModel, offset = 0, limit = 50 }) => {
        return new Promise((resolve, reject) => VehicleModel.findAndCountAll({
            offset: Number(offset),
            limit: Number(limit),
        })
            .then((data) => resolve({ message: data }))
            .catch(({ errors }) => reject({
            errorCode: 500,
            message: errors,
        })));
    },
};
exports.default = service;
//# sourceMappingURL=vehicle.service.js.map