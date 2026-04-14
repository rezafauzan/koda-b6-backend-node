import { Router } from "express";
import * as productReviewsController from "../controllers/product_reviews.controller.js"

const productReviewsRouter = Router()

/**
 * @openapi
 * /reviews/:
 *   get:
 *     tags:
 *       - product-reviews
 *     summary: Get popular products based on reviews
 *     description: Retrieve top popular products based on number of reviews
 *     responses:
 *       200:
 *         description: Successfully retrieved popular products
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
 *                   example: "Get popular products"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       category_id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: "Coffee Latte"
 *                       description:
 *                         type: string
 *                         example: "Delicious latte coffee"
 *                       price:
 *                         type: integer
 *                         example: 25000
 *                       stock:
 *                         type: integer
 *                         example: 10
 *                       total_reviews:
 *                         type: integer
 *                         example: 15
 *       500:
 *         description: Server error
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
 *                   nullable: true
 *                   example: null
 */
productReviewsRouter.get("", productReviewsController.getPopularProducts)

export default productReviewsRouter