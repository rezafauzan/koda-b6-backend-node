import { Router } from "express";
import * as userController from "../controllers/users.controller.js"
import AuthMiddleware from "../middleware/auth.middleware.js";

const userRouter = Router()

userRouter.use(AuthMiddleware)

userRouter.get("", userController.getAllUsers)
userRouter.post("", userController.createUsers)
userRouter.delete("/:id", userController.deleteUser)
userRouter.patch("/:id", userController.updateUser)

export default userRouter