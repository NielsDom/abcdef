export interface ILocationFindAll {
  message?: {
    count: number
    rows: {
      dataValues: {
        id: number
        vehicleID: number
        latLong: {
          type: string
          coordinates: number[]
        }
        date: string
      }
    }[]
  }
}
