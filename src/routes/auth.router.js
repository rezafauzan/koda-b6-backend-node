import { Router } from "express";
import * as authController from "../controllers/auth.controller.js"
const authRouter = Router()

/**
 * @openapi
 * /auth/login:
 *  post:
 *   tags: ['auth']
 *   description: Log into system with registered user
 *   requestBody:
 *       content: 
 *           application/json: 
 *              schema:
 *                  type: object
 *                  properties:
 *                      email: 
 *                          type: string
 *                      password:
 *                          type: string
 *   responses:
 *       200:
 *           description: 'login success'
 *       403:
 *           description: 'login fail'
 */
authRouter.post("/login", authController.login)
authRouter.post("/register", authController.register)

export default authRouter