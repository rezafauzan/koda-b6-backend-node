import { GenerateHash } from "../lib/hash.js"
import { httpResponse } from "../lib/http_handlers.js"
import * as userCredentialsModel from "../models/user_credentials.model.js"
import * as userModel from "../models/users.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getAllUsers(request, response) {
    try {
        const users = await userModel.getAllUsers()

        return httpResponse.ok(
            response,
            "Get all users data",
            users
        )
    } catch (error) {
        return httpResponse.serverError(
            response,
            "Failed get all users data " + error
        )
    }
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function createUsers(request, response) {
    const {
        first_name,
        last_name,
        address,
        phone,
        email,
        password,
        confirm_password
    } = request.body

    if (first_name === undefined || first_name.length < 4) {
        return httpResponse.badRequest(
            response,
            "Create user failed : First Name minimum 4 characters"
        )
    }

    if (last_name === undefined || last_name.length < 4) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Last Name minimum 4 characters"
        )
    }

    if (phone === undefined || phone.length < 10) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Phone Number minimum 10 digits"
        )
    }

    if (address === undefined || address.length < 10) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Address minimum 10 characters"
        )
    }

    if (email === undefined || !email.includes("@")) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Invalid email"
        )
    }

    if (password === undefined || password.length < 8) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Password too weak! minimum 8 characters"
        )
    }

    if (confirm_password !== password) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Confirm password not match"
        )
    }

    try {
        const user = await userCredentialsModel.getUserCredentialsByEmail(email)

        if (user) {
            return httpResponse.conflict(
                response,
                "Email already used!"
            )
        }

        const hashedPassword = await GenerateHash(password)

        const registeredUser =
            await userModel.createUsersWithProfileAndCredentials(
                { first_name, last_name, address },
                { email, phone, password: hashedPassword }
            )

        if (!registeredUser) {
            return httpResponse.serverError(
                response,
                "Create user transaction fail!"
            )
        }

        return httpResponse.created(
            response,
            "Create user success!",
            registeredUser
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Create users fail! " + error
        )
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

        return httpResponse.ok(
            response,
            "Delete user success!",
            user
        )
    } catch (error) {
        return httpResponse.serverError(
            response,
            "Delete user fail! " + error
        )
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

        return httpResponse.ok(
            response,
            "Update user success!",
            user
        )
    } catch (error) {
        return httpResponse.serverError(
            response,
            "Update user fail! " + error
        )
    }
}