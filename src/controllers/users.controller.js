import { GenerateHash } from "../lib/hash.js"
import * as userModel from "../models/users.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getAllUsers(request, response) {
    const users = await userModel.getAllUsers()
    response.json({
        success: true,
        message: "Get all users data",
        result: users
    })
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function createUsers(request, response) {
    const { first_name, last_name, address, phone, email, password, confirm_password } = request.body

    if (first_name === undefined || first_name.length < 4) {
        response.json({
            success: false,
            message: "Create user failed : First Name minimum 4 characters",
            result: null
        })
        return
    }

    if (last_name === undefined || last_name.length < 4) {
        response.json({
            success: false,
            message: "Create user failed :Last Name minimum 4 characters",
            result: null
        })
        return
    }

    if (phone === undefined || phone.length < 10) {
        response.json({
            success: false,
            message: "Create user failed : Phone Number minimum 10 digits",
            result: null
        })
        return
    }

    if (address === undefined || address.length < 10) {
        response.json({
            success: false,
            message: "Create user failed : Address minimum 10 characters",
            result: null
        })
        return
    }

    if (email === undefined || !email.includes("@")) {
        response.json({
            success: false,
            message: "Create user failed : Invalid email",
            result: null
        })
        return
    }

    if (password === undefined || password.length < 8) {
        response.json({
            success: false,
            message: "Create user failed : Password too weak! minimum 8 characters",
            result: null
        })
        return
    }

    if (confirm_password !== password) {
        response.json({
            success: false,
            message: "Create user failed : Confirm password not match",
            result: null
        })
        return
    }
    try {
        const user = await userCredentialsModel.getUserCredentialsByEmail(email);

        if (user) {
            return response.status(400).json({
                success: false,
                message: "Email already used!",
                results: null
            });
        }
    } catch { }

    try {
        const hashedPassword = await GenerateHash(password)
        const registeredUser = await userModel.createUsersWithProfileAndCredentials({ first_name, last_name, address }, { email, phone, password: hashedPassword })
        if (!registeredUser) {
            throw new Error("Create user transaction fail!");
        }

        response.json({
            success: true,
            message: "Create user success !",
            result: registeredUser
        })
    } catch (error) {
        response.json({
            success: true,
            message: "Create users fail !" + error,
            result: null
        })
    }
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function deleteUser(request, response) {
    try {
        const user = await userModel.deleteUser(request.params.id)
        response.json({
            success: true,
            message: "Delete users success !",
            result: user
        })

    } catch (error) {
        response.json({
            success: true,
            message: "Delete users fail !" + error,
            result: null
        })
    }
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function updateUser(request, response) {
    try {
        const user = await userModel.updateUser(request.params.id, request.body)
        response.json({
            success: true,
            message: "Update users success !",
            result: user
        })

    } catch (error) {
        response.json({
            success: true,
            message: "Update users fail !" + error,
            result: null
        })
    }
}