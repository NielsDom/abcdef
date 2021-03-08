import locationService from "../../services/location.service"
import authService from "../../services/auth.service"
import SequelizeMock from "sequelize-mock-v5"
import { ILocationFindAll } from "../../interfaces/location.interface"
const DBConnectionMock = new SequelizeMock()

const LocationModelMock = DBConnectionMock.define("VehicleModel", {
  id: 22,
  vehicleID: 123416999999,
  latLong: {
    type: "Point",
    coordinates: [58.0755381, 16.5555555],
  },
  date: "2021-03-03",
})
describe("Location services:", () => {
  test("success vehicle find", (done) => {
    return (async () => {
      try {
        const { message }: ILocationFindAll = await locationService.read({
          LocationModel: LocationModelMock,
          start: "2021-03-03",
          end: "2021-03-03",
          offset: 0,
          limit: 10,
          id: 123416999999,
        })

        expect(message).toMatchObject({
          count: 1,
          rows: [
            {
              id: 22,
              vehicleID: 123416999999,
              latLong: {
                type: "Point",
                coordinates: [58.0755381, 16.5555555],
              },
              date: "2021-03-03",
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
        const { message }: ILocationFindAll = await locationService.update({
          LocationModel: LocationModelMock,
          vehicleID: 46523615320,
          latLong: [58.0755381, 16.5555555],
          date: "2021-02-20",
        })

        expect(message).toContain("Vehicle location 46523615320")
      } finally {
        done()
      }
    })()
  })
})
