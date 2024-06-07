const express = require("express")

const getDevicesStatus = require("./calls/getDevicesStatus")

const app = express()
const PORT = 3001

app.get("/getDevicesStatus", async (_, res) => {
    const data = await getDevicesStatus()
    res.send(data)
})

app.listen(PORT, _ => {
    console.log(`Example app listening on port ${PORT}`)
})