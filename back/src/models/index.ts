const { DataTypes } = require("sequelize")

export default (sequelize) => ({
  VehicleModel: sequelize.define(
    "VehicleModel",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "VehicleModel",
      tableName: "VEHICLES",
    }
  ),
  LocationModel: sequelize.define(
    "LocationModel",
    {
      vehicleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      latLong: {
        type: DataTypes.GEOMETRY("POINT"),
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["vehicleID"],
        },
      ],
      sequelize,
      modelName: "LocationModel",
      tableName: "LOCATIONS",
      timestamps: false,
    }
  ),
})
