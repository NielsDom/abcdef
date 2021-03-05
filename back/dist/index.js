"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("./models"));
const app = express_1.default();
app.use(helmet_1.default());
app.use(express_rate_limit_1.default({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
}));
const wkx_1 = __importDefault(require("wkx"));
sequelize_1.Sequelize.GEOMETRY.prototype._stringify = function _stringify(value, options) {
    return `ST_GeomFromText(${options.escape(wkx_1.default.Geometry.parseGeoJSON(value).toWkt())})`;
};
sequelize_1.Sequelize.GEOMETRY.prototype._bindParam = function _bindParam(value, options) {
    return `ST_GeomFromText(${options.bindParam(wkx_1.default.Geometry.parseGeoJSON(value).toWkt())})`;
};
sequelize_1.Sequelize.GEOGRAPHY.prototype._stringify = function _stringify(value, options) {
    return `ST_GeomFromText(${options.escape(wkx_1.default.Geometry.parseGeoJSON(value).toWkt())})`;
};
sequelize_1.Sequelize.GEOGRAPHY.prototype._bindParam = function _bindParam(value, options) {
    return `ST_GeomFromText(${options.bindParam(wkx_1.default.Geometry.parseGeoJSON(value).toWkt())})`;
};
const { BACK_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;
const sequelize = new sequelize_1.Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: "mysql",
    dialect: "mysql",
    timezone: "+07:00",
});
app.use(cors_1.default());
app.use(body_parser_1.default.json());
const models = models_1.default(sequelize);
app.get("/", (req, res) => {
    res.send("The yddddolodddd!");
});
app.use("/api/location", require("./api/location.api")({ sequelize, models }));
app.use("/api/vehicle", require("./api/vehicle.api")({ sequelize, models }));
app.listen(BACK_PORT, () => console.log(`server is listening ${BACK_PORT}`));
//# sourceMappingURL=index.js.map