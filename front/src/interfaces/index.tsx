export interface IVehicle {
  id: number
}

export interface ILocation {
  id: number
  vehicleID: number
  latLong: {
    type: string
    coordinates: number[]
  }
  date: string
}
