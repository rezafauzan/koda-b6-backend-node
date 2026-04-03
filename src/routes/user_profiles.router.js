import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";
import * as userProfileController from "../controllers/user_profiles.controller.js"

const userProfileRouter = Router()

userProfileRouter.use(AuthMiddleware)

userProfileRouter.get("", userProfileController.getUserProfileById)

export default userProfileRouter