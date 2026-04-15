import * as roleModel from "../models/role.model.js"
import { httpResponse } from "../lib/http_handlers.js"

export async function getAllRoles(req, res) {
    try {
        const roles = await roleModel.getAllRoles()

        return httpResponse.ok(
            res,
            "Success get all roles",
            roles
        )

    } catch (error) {
        return httpResponse.serverError(
            res,
            "Failed to get roles: " + error.message
        )
    }
}

export async function createRole(req, res) {
    const { role_name } = req.body

    if (!role_name || role_name.trim().length < 4) {
        return httpResponse.badRequest(
            res,
            "role_name must be at least 4 characters"
        )
    }

    try {
        const role = await roleModel.createRole({
            role_name: role_name.trim()
        })

        return httpResponse.created(
            res,
            "Role created successfully",
            role
        )

    } catch (error) {
        return httpResponse.serverError(
            res,
            "Failed to create role: " + error.message
        )
    }
}

export async function getRoleByName(req, res) {
    const { name } = req.params

    if (!name) {
        return httpResponse.badRequest(res, "role name is required")
    }

    try {
        const role = await roleModel.getRoleByName({
            role_name: name
        })

        if (!role) {
            return httpResponse.notFound(res, "Role not found")
        }

        return httpResponse.ok(
            res,
            "Success get role",
            role
        )

    } catch (error) {
        return httpResponse.serverError(
            res,
            "Failed to get role: " + error.message
        )
    }
}

export async function updateRole(req, res) {
    const { id } = req.params
    const { role_name } = req.body

    if (!id) {
        return httpResponse.badRequest(res, "id is required")
    }

    if (!role_name || role_name.trim().length < 4) {
        return httpResponse.badRequest(
            res,
            "role_name must be at least 4 characters"
        )
    }

    try {
        const role = await roleModel.updateRole({
            id: Number(id),
            role_name: role_name.trim()
        })

        if (!role) {
            return httpResponse.notFound(res, "Role not found")
        }

        return httpResponse.ok(
            res,
            "Role updated successfully",
            role
        )

    } catch (error) {
        return httpResponse.serverError(
            res,
            "Failed to update role: " + error.message
        )
    }
}

export async function deleteRole(req, res) {
    const { id } = req.params

    if (!id) {
        return httpResponse.badRequest(res, "id is required")
    }

    try {
        const role = await roleModel.deleteRole({
            id: Number(id)
        })

        if (!role) {
            return httpResponse.notFound(res, "Role not found")
        }

        return httpResponse.ok(
            res,
            "Role deleted successfully",
            role
        )

    } catch (error) {
        return httpResponse.serverError(
            res,
            "Failed to delete role: " + error.message
        )
    }
}