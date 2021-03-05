const router = require("express").Router()
import vehicleService from "../services/vehicle.service"
import authService from "../services/auth.service"
import {
  IVehicleFindAll,
  IVehicleCreate,
} from "../interfaces/vehicle.interface"

module.exports = ({ sequelize, models: { VehicleModel } }) => {
  router.post("/", authService.verifyToken, async ({ body: { id } }, res) => {
    try {
      const { message }: IVehicleCreate = await vehicleService.create({
        VehicleModel,
        id,
      })
      res.send(message)
    } catch ({ errorCode, message }) {
      res.status(errorCode).send(message)
    }
  })

  router.get(
    "/",
    authService.verifyToken,
    async ({ query: { offset, limit } }, res) => {
      try {
        const { message }: IVehicleFindAll = await vehicleService.readAll({
          VehicleModel,
          offset,
          limit,
        })
        res.send(message)
      } catch ({ errorCode, message }) {
        res.status(errorCode).send(message)
      }
    }
  )

  return router
}
