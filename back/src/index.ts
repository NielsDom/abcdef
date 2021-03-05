import app from "./app"

const { BACK_PORT } = process.env

app.listen(BACK_PORT, () => console.log(`server is listening ${BACK_PORT}`))
