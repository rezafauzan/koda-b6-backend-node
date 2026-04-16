import { Router } from "express"
import * as roleController from "../controllers/role.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
import rbac from "../middleware/rbac.middleware.js"

const rolesRouter = Router()

/**
 * @openapi
 * /roles:
 *   get:
 *     tags:
 *       - roles
 *     summary: Get all roles
 *     description: Retrieve all roles from database
 *     responses:
 *       200:
 *         description: Successfully retrieved roles
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
 *                   example: "Success get all roles"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       role_name:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 */
rolesRouter.get("", authMiddleware, rbac("admin"), roleController.getAllRoles)

/**
 * @openapi
 * /roles:
 *   post:
 *     tags:
 *       - roles
 *     summary: Create new role
 *     description: Create a new role in database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_name:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Successfully created role
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
 *                   example: "Role created successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     role_name:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 */
rolesRouter.post("", authMiddleware, rbac("admin"), roleController.createRole)

/**
 * @openapi
 * /roles/{name}:
 *   get:
 *     tags:
 *       - roles
 *     summary: Get role by name
 *     description: Retrieve role by role_name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: admin
 *     responses:
 *       200:
 *         description: Successfully retrieved role
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
 *                   type: object
 *                   nullable: true
 */
rolesRouter.get("/:name", authMiddleware, rbac("admin"), roleController.getRoleByName)

/**
 * @openapi
 * /roles/{id}:
 *   put:
 *     tags:
 *       - roles
 *     summary: Update role
 *     description: Update role by id
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
 *               role_name:
 *                 type: string
 *                 example: "superadmin"
 *     responses:
 *       200:
 *         description: Successfully updated role
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
 *                   type: object
 *                   nullable: true
 */
rolesRouter.put("/:id", authMiddleware, rbac("admin"), roleController.updateRole)

/**
 * @openapi
 * /roles/{id}:
 *   delete:
 *     tags:
 *       - roles
 *     summary: Delete role
 *     description: Delete role by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully deleted role
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
 *                   type: object
 *                   nullable: true
 */
rolesRouter.delete("/:id", authMiddleware, rbac("admin"), roleController.deleteRole)

export default rolesRouter