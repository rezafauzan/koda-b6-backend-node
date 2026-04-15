import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";
import * as userProfileController from "../controllers/user_profiles.controller.js"
import { uploadMiddleware } from "../middleware/upload.middleware.js";

const userProfileRouter = Router()

userProfileRouter.use(AuthMiddleware)

userProfileRouter.get("", userProfileController.getUserProfileById)
userProfileRouter.patch("", userProfileController.updateUserProfile)
userProfileRouter.patch("/avatar", uploadMiddleware("/assets/img/user/avatar/").single("file"), userProfileController.updateUserAvatar)

export default userProfileRouter