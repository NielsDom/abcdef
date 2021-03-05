import jwt from "jsonwebtoken"

const { JWT_SECRET } = process.env

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2MTk5OTk5LCJpYXQiOjE2MTQ4OTQwNjR9.VlKZ_q20ogmi7bmxkHy7Fb4GOkoJQ_Flr4vO_3J9F7Q = id 123456199999
const service = {
  signToken: (id) => {
    return jwt.sign(
      {
        id,
      },
      JWT_SECRET
    )
  },
  verifyToken: ({ headers: { authorization } }, res, next) => {
    console.log("authorization", authorization)
    if (authorization) {
      jwt.verify(authorization.split(" ")[1], JWT_SECRET, (err) => {
        if (err) {
          return res.sendStatus(403)
        }
        next()
      })
    } else {
      res.sendStatus(401)
    }
  },
  verifyTokenLocation: (req, res, next) => {
    const {
      headers: { authorization },
    } = req

    if (authorization) {
      jwt.verify(authorization.split(" ")[1], JWT_SECRET, (err, data) => {
        if (err) {
          return res.sendStatus(403)
        }
        req.tokenData = data
        next()
      })
    } else {
      res.sendStatus(401)
    }
  },
}

export default service
