import bodyParser from "body-parser"
import express from "express"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import cors from "cors"
import { Sequelize } from "sequelize"
import modelsList from "./models"

const app = express()
app.use(helmet())
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)

import wkx from "wkx"
Sequelize.GEOMETRY.prototype._stringify = function _stringify(value, options) {
  return `ST_GeomFromText(${options.escape(
    wkx.Geometry.parseGeoJSON(value).toWkt()
  )})`
}
Sequelize.GEOMETRY.prototype._bindParam = function _bindParam(value, options) {
  return `ST_GeomFromText(${options.bindParam(
    wkx.Geometry.parseGeoJSON(value).toWkt()
  )})`
}
Sequelize.GEOGRAPHY.prototype._stringify = function _stringify(value, options) {
  return `ST_GeomFromText(${options.escape(
    wkx.Geometry.parseGeoJSON(value).toWkt()
  )})`
}
Sequelize.GEOGRAPHY.prototype._bindParam = function _bindParam(value, options) {
  return `ST_GeomFromText(${options.bindParam(
    wkx.Geometry.parseGeoJSON(value).toWkt()
  )})`
}

const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: "mysql",
  dialect: "mysql",
  timezone: "+07:00",
})
app.use(cors())

app.use(bodyParser.json())

const models = modelsList(sequelize)

app.get("/", (req, res) => {
  res.send("The yddddolodddd!")
})

app.use("/api/location", require("./api/location.api")({ sequelize, models }))
app.use("/api/vehicle", require("./api/vehicle.api")({ sequelize, models }))

export default app
