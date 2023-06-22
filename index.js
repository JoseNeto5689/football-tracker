import express from "express";
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app.use(express.static("public"));

app.listen(port, () => {
    console.table({
        Status: "Working",
        Port: port,
    })
})