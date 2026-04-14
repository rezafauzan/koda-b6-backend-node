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
productReviewsRouter.get("/recommended-products", productReviewsController.getPopularProducts)

/**
 * @openapi
 * /reviews:
 *   get:
 *     tags:
 *       - product-reviews
 *     summary: Get latest product reviews
 *     description: Retrieve latest product reviews from database
 *     responses:
 *       200:
 *         description: Successfully retrieved latest product reviews
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
 *                   example: "Get latest products reviews data"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       product_id:
 *                         type: integer
 *                         example: 2
 *                       user_id:
 *                         type: integer
 *                         example: 5
 *                       rating:
 *                         type: integer
 *                         example: 4
 *                       messages:
 *                         type: string
 *                         example: "Great coffee!"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-04-14T10:00:00.000Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-04-14T10:00:00.000Z"
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
productReviewsRouter.get("/reviews", productReviewsController.getLatestReviews)

export default productReviewsRouter