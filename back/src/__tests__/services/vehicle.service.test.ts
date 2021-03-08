import vehicleService from "../../services/vehicle.service"
import SequelizeMock from "sequelize-mock-v5"
import {
  IVehicleFindAll,
  IVehicleCreate,
} from "../../interfaces/vehicle.interface"
const DBConnectionMock = new SequelizeMock()

const VehicleModelMock = DBConnectionMock.define("VehicleModel", {
  id: 22,
  vehicleID: 123416999999,
  latLong: {
    type: "Point",
    coordinates: [58.0755381, 16.5555555],
  },
  date: "2021-03-03",
})

describe("Vehicle services:", () => {
  test("success vehicle find", (done) => {
    return (async () => {
      try {
        const { message }: IVehicleFindAll = await vehicleService.readAll({
          VehicleModel: VehicleModelMock,
          offset: 0,
          limit: 20,
        })
        expect(message).toMatchObject({
          count: 1,
          rows: [
            {
              id: 123416999999,
            },
          ],
        })
      } finally {
        done()
      }
    })()
  })

  test("success vehicle create", (done) => {
    return (async () => {
      try {
        const { message }: IVehicleCreate = await vehicleService.create({
          VehicleModel: VehicleModelMock,
          id: 46523615320,
        })

        expect(message).toBe({
          id: 46523615320,
        })
      } finally {
        done()
      }
    })()
  })
})
