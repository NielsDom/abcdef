const router = require("express").Router()
import locationService from "../services/location.service"
import authService from "../services/auth.service"
import { ILocationFindAll } from "../interfaces/location.interface"

module.exports = ({ sequelize, models: { LocationModel } }) => {
  router.put("/", authService.verifyTokenLocation, async (req, res, next) => {
    const {
      body: { latLong, date },
      tokenData: { id },
    } = req
    try {
      const { message }: ILocationFindAll = await locationService.update({
        LocationModel,
        vehicleID: id,
        latLong,
        date,
      })
      res.send(message)
    } catch ({ errorCode, message }) {
      res.status(errorCode).send(message)
    }
  })

  router.get(
    "/:id",
    authService.verifyToken,
    async ({ query: { start, end, offset, limit }, params: { id } }, res) => {
      try {
        const allVehicles = await locationService.read({
          LocationModel,
          start,
          end,
          offset,
          limit,
          id,
        })
        res.send(allVehicles)
      } catch (e) {
        console.log("e", e)
      }
    }
  )

  return router
}
