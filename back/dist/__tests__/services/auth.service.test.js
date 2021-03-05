"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../../services/auth.service"));
describe("Auth services:", () => {
    test("token valid", (done) => {
        let statusCode = 0;
        const res = {
            sendStatus: (code) => (statusCode = code),
        };
        const next = () => {
            statusCode = 200;
        };
        const tokenValid = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2MTk5OTk5LCJpYXQiOjE2MTQ4OTQwNjR9.VlKZ_q20ogmi7bmxkHy7Fb4GOkoJQ_Flr4vO_3J9F7Q",
            },
        };
        auth_service_1.default.verifyToken(tokenValid, res, next);
        expect(statusCode).toBe(200);
        done();
    });
    test("token not valid", (done) => {
        let statusCode = 0;
        const res = {
            sendStatus: (code) => (statusCode = code),
        };
        const next = () => {
            statusCode = 200;
        };
        const tokenWrong = {
            headers: {
                authorization: "Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2MTk5OTk5LCJpYXQiOjE2MTQ4OTQwNjR9.VlKZ_q20ogmi7bmxkHy7Fb4GOkoJQ_Flr4vO_3J9F7Q",
            },
        };
        auth_service_1.default.verifyToken(tokenWrong, res, next);
        expect(statusCode).toBe(403);
        done();
    });
    test("token empty", (done) => {
        let statusCode = 0;
        const res = {
            sendStatus: (code) => (statusCode = code),
        };
        const next = () => {
            statusCode = 200;
        };
        const tokenEmpty = {
            headers: {
                authorization: null,
            },
        };
        auth_service_1.default.verifyToken(tokenEmpty, res, next);
        expect(statusCode).toBe(401);
        done();
    });
});
//# sourceMappingURL=auth.service.test.js.map