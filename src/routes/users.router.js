import { Router } from "express";
import * as userController from "../controllers/users.controller.js"

const userRouter = Router()

userRouter.get("", userController.getAllUsers)
userRouter.post("", userController.createUsers)

export default userRouter