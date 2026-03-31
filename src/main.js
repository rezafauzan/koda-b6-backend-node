import express from "express"
import {constants} from "node:http2"
import authRouter from "./routes/auth.router.js"
import userRouter from "./routes/users.router.js"

const app = express()
const port = process.env.PORT || 8888

app.use(express.json())

app.get("/", function(request, respond){
    console.log("OK")
    respond.status(constants.HTTP_STATUS_OK).json({
        success: true,
        message: "Backend is running well",
        result: []
    })
})

app.use("/auth", authRouter)
app.use("/admin/users", userRouter)

app.listen(port, function(){
    console.log(`App listening on port ${port}`)
})