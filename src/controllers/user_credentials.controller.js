import { GenerateHash } from "../lib/hash.js"
import { verifyToken } from "../lib/jwt.js"
import * as userCredentialsModel from "../models/user_credentials.model.js"
import { httpResponse } from "../lib/http_handlers.js"

function getUserFromToken(request) {
    const authHeader = request.headers.authorization
    const prefix = "Bearer "

    if (!authHeader || !authHeader.startsWith(prefix)) {
        return null
    }

    const token = authHeader.slice(prefix.length)
    return verifyToken(token)
}

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getUserCredentialsById(request, response) {
    const payload = getUserFromToken(request)

    if (!payload) {
        return httpResponse.unauthorized(response, "Authorization token missing or invalid")
    }

    try {
        const data =
            await userCredentialsModel.getUserCredentialsByUserId(payload.id)

        if (!data) {
            return httpResponse.notFound(response, "User not found")
        }

        const { password, ...safeData } = data

        return httpResponse.ok(
            response,
            "Success get user credentials",
            safeData
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Failed get user credentials: " + error.message
        )
    }
}

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function updateUserCredentials(request, response) {
    const payload = getUserFromToken(request)

    if (!payload) {
        return httpResponse.unauthorized(response, "Authorization token missing or invalid")
    }

    const { email, phone, password, confirm_password } = request.body

    try {
        const currentUser =
            await userCredentialsModel.getUserCredentialsByUserId(payload.id)

        if (!currentUser) {
            return httpResponse.notFound(response, "User not found")
        }

        // EMAIL VALIDATION
        if (email !== undefined) {
            if (!email.includes("@")) {
                return httpResponse.badRequest(response, "Email invalid")
            }

            const existingEmail =
                await userCredentialsModel.getUserCredentialsByEmail(email)

            if (existingEmail && existingEmail.user_id !== payload.id) {
                return httpResponse.badRequest(response, "Email already used")
            }
        }

        // PHONE VALIDATION
        if (phone !== undefined && phone.length < 10) {
            return httpResponse.badRequest(
                response,
                "Phone must be at least 10 digits"
            )
        }

        // PASSWORD VALIDATION
        let hashedPassword = currentUser.password

        if (password !== undefined) {
            if (password.length < 8) {
                return httpResponse.badRequest(
                    response,
                    "Password must be at least 8 characters"
                )
            }

            if (password !== confirm_password) {
                return httpResponse.badRequest(
                    response,
                    "Password confirmation mismatch"
                )
            }

            hashedPassword = await GenerateHash(password)
        }

        const newUserCredentialsData = {
            user_id: currentUser.user_id,
            email: email ?? currentUser.email,
            phone: phone ?? currentUser.phone,
            password: hashedPassword,
            updated_at: new Date()
        }

        const updated =
            await userCredentialsModel.updateUserCredentials(newUserCredentialsData)

        return httpResponse.ok(
            response,
            "Success update user credentials",
            updated
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Failed update user credentials: " + error.message
        )
    }
}