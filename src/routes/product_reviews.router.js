import { Router } from "express";
import * as productReviewsController from "../controllers/product_reviews.controller.js"

const productReviewsRouter = Router()

/**
 * @openapi
 * /product-reviews:
 *   get:
 *     tags:
 *       - product-reviews
 *     summary: Get all product reviews
 *     description: Retrieve all product reviews from database
 *     responses:
 *       200:
 *         description: Successfully retrieved product reviews
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
 *                   example: "Get all products reviews data"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
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
 *                   type: null
 */
productReviewsRouter.get("", productReviewsController.getAllProductsReviews)

export default productReviewsRouter