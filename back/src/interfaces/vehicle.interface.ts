export interface IVehicleFindAll {
  message?: {
    count: number
    rows: {
      dataValues: {
        id: number
        createdAt: string
        updatedAt: string
      }
    }[]
  }
}

export interface IVehicleCreate {
  message?: {
    dataValues: {
      id: number
      createdAt: string
      updatedAt: string
    }
  }
}
