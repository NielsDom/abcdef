"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_SECRET } = process.env;
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2MTk5OTk5LCJpYXQiOjE2MTQ4OTQwNjR9.VlKZ_q20ogmi7bmxkHy7Fb4GOkoJQ_Flr4vO_3J9F7Q = id 123456199999
const service = {
    signToken: (id) => {
        return jsonwebtoken_1.default.sign({
            id,
        }, JWT_SECRET);
    },
    verifyToken: ({ headers: { authorization } }, res, next) => {
        if (authorization) {
            jsonwebtoken_1.default.verify(authorization.split(" ")[1], JWT_SECRET, (err) => {
                if (err) {
                    return res.sendStatus(403);
                }
                next();
            });
        }
        else {
            res.sendStatus(401);
        }
    },
    verifyTokenLocation: (req, res, next) => {
        const { headers: { authorization }, } = req;
        if (authorization) {
            jsonwebtoken_1.default.verify(authorization.split(" ")[1], JWT_SECRET, (err, data) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.tokenData = data;
                next();
            });
        }
        else {
            res.sendStatus(401);
        }
    },
};
exports.default = service;
//# sourceMappingURL=auth.service.js.map