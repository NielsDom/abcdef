import validator from "validator"
import { Op } from "sequelize"

const service = {
  read: ({ LocationModel, start, end, offset, limit, id }) => {
    return new Promise((resolve, reject) => {
      return LocationModel.findAndCountAll({
        where: {
          vehicleID: id,
          date: {
            [Op.lte]: new Date(end),
            [Op.gte]: new Date(start),
          },
        },
        offset: Number(offset),
        limit: Number(limit),
      })
        .then((data) => resolve(data))
        .catch(() =>
          reject({
            errorCode: 500,
            message: "Cannot read",
          })
        )
    })
  },
  update: ({ LocationModel, vehicleID, latLong, date }) => {
    return new Promise((resolve, reject) => {
      if (!vehicleID || !latLong || !date) {
        reject({
          errorCode: 400,
          message: "Missing parameters",
        })
      }

      if (!validator.isLatLong(`${latLong[0]}, ${latLong[1]}`)) {
        reject({
          errorCode: 400,
          message: "Lat long wrong",
        })
      }

      return (async () => {
        try {
          const find = await LocationModel.findOne({
            where: { vehicleID, date },
          })
          if (find) {
            const { dataValues } = await find.update({
              latLong: { type: "Point", coordinates: [latLong[0], latLong[1]] },
              date,
            })
            return resolve({
              message: `Vehicle location ${dataValues.vehicleID} updated`,
            })
          }
          if (find === null) {
            const { dataValues } = await LocationModel.create({
              vehicleID,
              latLong: { type: "Point", coordinates: [latLong[0], latLong[1]] },
              date,
            })
            return resolve({
              message: `Vehicle location ${dataValues.vehicleID} created`,
            })
          }
        } catch (e) {
          reject({
            errorCode: 500,
            message: "Error DB, please check if vehicle ID exists",
          })
        }
      })()
    })
  },
}

export default service
