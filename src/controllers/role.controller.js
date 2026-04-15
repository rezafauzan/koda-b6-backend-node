import * as roleModel from "../models/role.model.js"

export async function getAllRoles(req, res) {
    try {
        const roles = await roleModel.getAllRoles()

        return res.json({
            success: true,
            message: "Success get all roles",
            result: roles
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Failed to get roles",
            result: null
        })
    }
}

export async function createRole(req, res) {
    try {
        const { role_name } = req.body

        if (!role_name || role_name.trim().length < 4) {
            return res.json({
                success: false,
                message: "role_name must be at least 4 characters",
                result: null
            })
        }

        const role = await roleModel.createRole({ role_name: role_name.trim() })

        return res.json({
            success: true,
            message: "Role created successfully",
            result: role
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Failed to create role",
            result: null
        })
    }
}

export async function getRoleByName(req, res) {
    try {
        const { name } = req.params

        if (!name) {
            return res.json({
                success: false,
                message: "role name is required",
                result: null
            })
        }

        const role = await roleModel.getRoleByName({ role_name: name })

        if (!role) {
            return res.json({
                success: false,
                message: "Role not found",
                result: null
            })
        }

        return res.json({
            success: true,
            message: "Success get role",
            result: role
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Failed to get role",
            result: null
        })
    }
}

export async function updateRole(req, res) {
    try {
        const { id } = req.params
        const { role_name } = req.body

        if (!id) {
            return res.json({
                success: false,
                message: "id is required",
                result: null
            })
        }

        if (!role_name || role_name.trim().length < 4) {
            return res.json({
                success: false,
                message: "role_name must be at least 4 characters",
                result: null
            })
        }

        const role = await roleModel.updateRole({
            id: Number(id),
            role_name: role_name.trim()
        })

        if (!role) {
            return res.json({
                success: false,
                message: "Role not found",
                result: null
            })
        }

        return res.json({
            success: true,
            message: "Role updated successfully",
            result: role
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Failed to update role",
            result: null
        })
    }
}

export async function deleteRole(req, res) {
    try {
        const { id } = req.params

        if (!id) {
            return res.json({
                success: false,
                message: "id is required",
                result: null
            })
        }

        const role = await roleModel.deleteRole({ id: Number(id) })

        if (!role) {
            return res.json({
                success: false,
                message: "Role not found",
                result: null
            })
        }

        return res.json({
            success: true,
            message: "Role deleted successfully",
            result: role
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Failed to delete role",
            result: null
        })
    }
}