import { Router } from "express";
import * as cartItemsController from "../controllers/cart_items.controller.js"

const cartItemsRouter = Router()

/**
 * @openapi
 * /cart:
 *   post:
 *     tags:
 *       - cart-items
 *     summary: Add item to cart
 *     description: Create new cart item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: integer
 *                 example: 1
 *               product_id:
 *                 type: integer
 *                 example: 2
 *               size_id:
 *                 type: integer
 *                 example: 1
 *               variant_id:
 *                 type: integer
 *                 example: 3
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successfully added item to cart
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
 *                   example: "Add to cart success !"
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     cart_id:
 *                       type: integer
 *                       example: 1
 *                     product_id:
 *                       type: integer
 *                       example: 2
 *                     size_id:
 *                       type: integer
 *                       example: 1
 *                     variant_id:
 *                       type: integer
 *                       example: 3
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 */
cartItemsRouter.post("", cartItemsController.createCartItem)

/**
 * @openapi
 * /cart:
 *   get:
 *     tags:
 *       - cart-items
 *     summary: Get all cart items by cart id
 *     description: Retrieve all cart items based on cart_id
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items
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
 *                   example: "Get all cart items success"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       cart_id:
 *                         type: integer
 *                       product_id:
 *                         type: integer
 *                       size_id:
 *                         type: integer
 *                       variant_id:
 *                         type: integer
 *                       quantity:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 */
cartItemsRouter.get("", cartItemsController.getAllCartItemsByCartId)

/**
 * @openapi
 * /cart/{id}:
 *   delete:
 *     tags:
 *       - cart-items
 *     summary: Delete cart item
 *     description: Delete cart item by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted cart item
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
 *                   example: "Delete cart item success !"
 *                 result:
 *                   type: object
 *                   nullable: true
 */
cartItemsRouter.delete("/:id", cartItemsController.deleteCartItem)

export default cartItemsRouter