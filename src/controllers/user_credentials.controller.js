import { GenerateHash } from "../lib/hash.js"
import { verifyToken } from "../lib/jwt.js"
import * as userCredentialsModel from "../models/user_credentials.model.js"

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getUserCredentialsById(request, response) {
    const authHeader = request.headers.authorization
    const prefix = "Bearer "
    const isBearer = authHeader?.startsWith(prefix)

    if (!isBearer) {
        return response.status(401).json({
            success: false,
            message: "Authorization token missing!",
            result: null
        })
    }

    const token = authHeader.slice(prefix.length)
    const payload = verifyToken(token)

    if (!payload) {
        return response.json({
            success: false,
            message: "Failed get user credentials! token invalid",
            result: null
        })
    }

    try {
        const { password, ...userCredentials } =
            await userCredentialsModel.getUserCredentialsByUserId(payload.id)

        return response.json({
            success: true,
            message: "Success get user credentials!",
            result: userCredentials
        })
    } catch (error) {
        return response.json({
            success: false,
            message: "Failed get user credentials! " + error,
            result: null
        })
    }
}

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function updateUserCredentials(request, response) {
    const authHeader = request.headers.authorization
    const prefix = "Bearer "
    const isBearer = authHeader?.startsWith(prefix)

    if (!isBearer) {
        return response.status(401).json({
            success: false,
            message: "Authorization token missing!",
            result: null
        })
    }

    const token = authHeader.slice(prefix.length)

    const payload = verifyToken(token)

    if (!payload) {
        return response.json({
            success: false,
            message: "Failed update user credentials! token invalid",
            result: null
        })
    }

    const userCurrentCredentials = await userCredentialsModel.getUserCredentialsByUserId(payload.id)

    const { email, phone, password, confirm_password } = request.body

    if (email !== undefined && !email.includes("@")) {
        return response.status(400).json({
            success: false,
            message: "Email invalid",
            results: null
        })
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
    } catch {}


    if (phone !== undefined && phone.length < 10) {
        return response.status(400).json({
            success: false,
            message: "Phone must be at least 10 digits long",
            results: null
        })
    }

    if (password !== undefined && password.length < 8) {
        return response.status(400).json({
            success: false,
            message: "Password too weak must be at least 8 characters long",
            results: null
        })
    }

    if (confirm_password !== undefined && confirm_password.length < 8) {
        return response.status(400).json({
            success: false,
            message: "Confirm password doesn't match",
            results: null
        })
    }

    const hashedPassword = password ? await GenerateHash(password) : userCurrentCredentials.password

    const newUserCredentialsData = {
        user_id: userCurrentCredentials.user_id,
        email: email ?? userCurrentCredentials.email,
        phone: phone ?? userCurrentCredentials.phone,
        password: hashedPassword ?? userCurrentCredentials.password,
        updated_at: new Date()
    }

    try {
        const userCredentials = await userCredentialsModel.updateUserCredentials(newUserCredentialsData)

        return response.json({
            success: true,
            message: "Success update user credentials!",
            result: userCredentials
        })
    } catch (error) {
        return response.json({
            success: false,
            message: "Failed update user credentials! " + error,
            result: null
        })
    }
}