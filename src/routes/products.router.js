import { Router } from "express"
import * as productController from "../controllers/products.controller.js"

const productRouter = Router()

/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - products
 *     summary: Get products
 *     description: Get all products or filter by name using query
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         example: "shoe"
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 result:
 *                   type: array
 */
productRouter.get("", productController.getProducts)

/**
 * @openapi
 * /products/category/{category_id}:
 *   get:
 *     tags:
 *       - products
 *     summary: Get products by category id
 *     description: Retrieve products based on category id
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved products by category
 */
productRouter.get("/category/:category_id", productController.getProductsByCategoryId)

/**
 * @openapi
 * /products:
 *   post:
 *     tags:
 *       - products
 *     summary: Create product
 *     description: Add new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product created successfully
 */
productRouter.post("", productController.createProduct)

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     tags:
 *       - products
 *     summary: Update product
 *     description: Update product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
productRouter.put("/:id", productController.updateProduct)

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     tags:
 *       - products
 *     summary: Delete product
 *     description: Delete product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
productRouter.delete("/:id", productController.deleteProduct)

export default productRouter