import { Router } from "express";
import * as forgotPasswordController from "../controllers/forgot_password.controller.js"
const forgotPasswordRouter = Router()

/**
 * @openapi
 * /forgot-password:
 *   post:
 *     tags:
 *       - auth
 *     summary: Request forgot password OTP
 *     description: Send OTP code to user email for password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *     responses:
 *       200:
 *         description: Forgot password OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Request forgot password success !"
 *                 result:
 *                   type: object
 *                   nullable: true
 *       400:
 *         description: Invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Request forgot password failed : Invalid email format !"
 *                 result:
 *                   type: null
 *       500:
 *         description: Server error / user not registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                 result:
 *                   type: null
 */ 
forgotPasswordRouter.post("/request", forgotPasswordController.requestForgotPassword)
forgotPasswordRouter.post("/reset", forgotPasswordController.resetPassword)

export default forgotPasswordRouter