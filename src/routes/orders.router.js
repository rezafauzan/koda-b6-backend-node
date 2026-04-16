import { Router } from "express"
import * as orderController from "../controllers/orders.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import rbac from "../middleware/rbac.middleware.js"

const paymentRouter = Router()

/**
 * @openapi
 * /payment:
 *   post:
 *     tags:
 *       - payment
 *     summary: Checkout cart and create order
 *     description: Create order from cart items and clear cart after successful payment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 example: "08123456789"
 *               email:
 *                 type: string
 *                 example: "john@mail.com"
 *               address:
 *                 type: string
 *                 example: "Jl. Sudirman No. 10"
 *               delivery:
 *                 type: string
 *                 example: "jne"
 *     responses:
 *       201:
 *         description: Successfully created order
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
 *                   example: "Checkout success!"
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     cart_id:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     status:
 *                       type: integer
 *                     fullname:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     address:
 *                       type: string
 *                     delivery:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 */
paymentRouter.post("", authMiddleware, orderController.createPayment)

export default paymentRouter