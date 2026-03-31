import express from "express"
import {constants} from "node:http2"
import userRouter from "./routes/users.router"

const app = express()
const port = 8888

app.use(express.json())

app.get("/", function(request, respond){
    console.log("OK")
    respond.status(constants.HTTP_STATUS_OK).json({
        success: true,
        message: "Backend is running well",
        result: []
    })
})

app.use("/users", userRouter)

app.listen(port, function(){
    console.log(`App listening on port ${port}`)
})