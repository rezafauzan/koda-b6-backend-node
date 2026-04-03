import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";
import * as userCredentialsController from "../controllers/user_credentials.controller.js"

const userCredentialsRouter = Router()

userCredentialsRouter.use(AuthMiddleware)

userCredentialsRouter.get("", userCredentialsController.getUserCredentialsById)
userCredentialsRouter.patch("", userCredentialsController.updateUserCredentials)

export default userCredentialsRouter