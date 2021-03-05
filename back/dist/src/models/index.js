"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Sequelize } = require("sequelize");
exports.default = (sequelize) => ({
    VehicleModel: sequelize.define("VehicleModel", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "VehicleModel",
        tableName: "VEHICLES",
    }),
    LocationModel: sequelize.define("LocationModel", {
        vehicleID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        latLong: {
            type: DataTypes.GEOMETRY("POINT"),
            // allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "LocationModel",
        tableName: "LOCATIONS",
        timestamps: false,
    }),
});
//# sourceMappingURL=index.js.map