import express from "express"
import {constants} from "node:http2"
import docsRouter from "./routes/docs.router.js"
import authRouter from "./routes/auth.router.js"
import userRouter from "./routes/users.router.js"
import userProfileRouter from "./routes/user_profiles.router.js"
import userCredentialsRouter from "./routes/user_credentials.router.js"
import forgotPasswordRouter from "./routes/forgot_password.router.js"
import productReviewsRouter from "./routes/product_reviews.router.js"
import { corsMiddleware } from "./middleware/cors.middleware.js"
import authMiddleware from "./middleware/auth.middleware.js"
import cartItemsRouter from "./routes/cart_items.router.js"
import productRouter from "./routes/products.router.js"
import rolesRouter from "./routes/role.router.js"
import rbac from "./middleware/rbac.middleware.js"

const app = express()
app.use(corsMiddleware)
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
app.use("/role", rbac("admin"), authMiddleware, rolesRouter)
app.use("/admin/users", rbac("admin"), authMiddleware, userRouter)
app.use("/profile", authMiddleware, userProfileRouter)
app.use("/assets", express.static("assets"))
app.use("/credentials", authMiddleware, userCredentialsRouter)
app.use("/forgot-password", forgotPasswordRouter)
app.use("/products", productRouter)
app.use("", productReviewsRouter)
app.use("/cart", authMiddleware, cartItemsRouter)

app.listen(port, function(){
    console.log(`App listening on port ${port}`)
})