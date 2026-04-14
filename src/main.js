import express from "express"
import {constants} from "node:http2"
import docsRouter from "./routes/docs.router.js"
import authRouter from "./routes/auth.router.js"
import userRouter from "./routes/users.router.js"
import userProfileRouter from "./routes/user_profiles.router.js"
import userCredentialsRouter from "./routes/user_credentials.router.js"
import forgotPasswordRouter from "./routes/forgot_password.router.js"
import productReviewsRouter from "./routes/product_reviews.router.js"

const app = express()
const port = process.env.PORT || 8888

app.use(express.json())
/**
 * @openapi
 * /:
 *  get:
 *      tags: ['Health Check']
 *      description: Health Check
 *      responses:
 *          200:
 *              description: Returning JSON with success and message
 */
app.get("/", function(request, respond){
    console.log("OK")
    respond.status(constants.HTTP_STATUS_OK).json({
        success: true,
        message: "Backend is running well",
        result: []
    })
})

app.use("/docs", docsRouter)
app.use("/auth", authRouter)
app.use("/admin/users", userRouter)
app.use("/profile", userProfileRouter)
app.use("/credentials", userCredentialsRouter)
app.use("/forgot-password", forgotPasswordRouter)
app.use("/reviews", productReviewsRouter)

app.listen(port, function(){
    console.log(`App listening on port ${port}`)
})