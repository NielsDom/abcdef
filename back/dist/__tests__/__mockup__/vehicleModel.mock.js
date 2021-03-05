"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_mock_1 = __importDefault(require("./db.mock"));
const VehicleModelMock = db_mock_1.default.define("VehicleModel", {
    id: 123416999999,
    createdAt: "2021-03-04 20:14:24",
    updatedAt: "2021-03-04 20:14:24",
});
exports.default = VehicleModelMock;
//# sourceMappingURL=vehicleModel.mock.js.map