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
const vehicle_service_1 = __importDefault(require("../../services/vehicle.service"));
const sequelize_mock_v5_1 = __importDefault(require("sequelize-mock-v5"));
const DBConnectionMock = new sequelize_mock_v5_1.default();
const VehicleModelMock = DBConnectionMock.define("VehicleModel", {
    id: 22,
    vehicleID: 123416999999,
    latLong: {
        type: "Point",
        coordinates: [58.0755381, 16.5555555],
    },
    date: "2021-03-03",
});
describe("Vehicle services:", () => {
    test("success vehicle find", (done) => {
        return (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { message } = yield vehicle_service_1.default.readAll({
                    VehicleModel: VehicleModelMock,
                    offset: 0,
                    limit: 20,
                });
                expect(message).toMatchObject({
                    count: 1,
                    rows: [
                        {
                            createdAt: "2021-03-04 20:14:24",
                            id: 123416999999,
                            updatedAt: "2021-03-04 20:14:24",
                        },
                    ],
                });
            }
            finally {
                done();
            }
        }))();
    });
    test("success vehicle create", (done) => {
        return (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { message } = yield vehicle_service_1.default.create({
                    VehicleModel: VehicleModelMock,
                    id: 46523615320,
                });
                expect(message).toBe({
                    id: 46523615320,
                });
            }
            finally {
                done();
            }
        }))();
    });
});
//# sourceMappingURL=vehicle.service.test.js.map