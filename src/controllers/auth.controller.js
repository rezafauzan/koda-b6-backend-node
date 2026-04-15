import * as userModel from "../models/users.model.js"
import * as userCredentialsModel from "../models/user_credentials.model.js"
import { generateToken } from "../lib/jwt.js"
import { GenerateHash, VerifyHash } from "../lib/hash.js"
import { httpResponse } from "../lib/http_handlers.js"

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function login(request, response) {
    const { email, password } = request.body

    if (!email || !email.includes("@")) {
        return httpResponse.badRequest(response, "Login failed: email invalid")
    }

    if (!password) {
        return httpResponse.badRequest(response, "Login failed: password required")
    }

    try {
        const userCredentials = await userCredentialsModel.getUserCredentialsByEmail(email)

        if (!userCredentials) {
            return httpResponse.unauthorized(
                response,
                "Login failed! wrong email or password"
            )
        }

        const isValidPassword = await VerifyHash(userCredentials.password, password)

        if (!isValidPassword) {
            return httpResponse.unauthorized(
                response,
                "Login failed! wrong email or password"
            )
        }

        const userData = await userCredentialsModel.getUserCartAndRoleByUserId(
            userCredentials.user_id
        )

        if (!userData || !userData.cart_id || !userData.role_name) {
            return httpResponse.serverError(
                response,
                "Data user tidak valid, hubungi administrator"
            )
        }

        const payload = {
            id: userCredentials.user_id,
            cart_id: userData.cart_id,
            role_name: userData.role_name
        }

        const token = generateToken(payload)

        return httpResponse.ok(
            response,
            "Login success!",
            { token },
            {
                self: "/auth/login",
                profile: "/users/me"
            }
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Login failed: " + error.message
        )
    }
}

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function register(request, response) {
    const { first_name, last_name, address, phone, email, password, confirm_password } = request.body

    if (!first_name || first_name.length < 4) {
        return httpResponse.badRequest(response, "First Name minimum 4 characters")
    }

    if (!last_name || last_name.length < 4) {
        return httpResponse.badRequest(response, "Last Name minimum 4 characters")
    }

    if (!phone || phone.length < 10) {
        return httpResponse.badRequest(response, "Phone Number minimum 10 digits")
    }

    if (!address || address.length < 10) {
        return httpResponse.badRequest(response, "Address minimum 10 characters")
    }

    if (!email || !email.includes("@")) {
        return httpResponse.badRequest(response, "Invalid email")
    }

    if (!password || password.length < 8) {
        return httpResponse.badRequest(response, "Password minimum 8 characters")
    }

    if (confirm_password !== password) {
        return httpResponse.badRequest(response, "Confirm password not match")
    }

    try {
        const existingUser = await userCredentialsModel.getUserCredentialsByEmail(email)

        if (existingUser) {
            return httpResponse.conflict
                ? 
                httpResponse.conflict(response, "Email already used!")
                : 
                httpResponse.badRequest(response, "Email already used!")
        }

        const hashedPassword = await GenerateHash(password)

        const registeredUser =
            await userModel.createUsersWithProfileAndCredentials(
                { first_name, last_name, address },
                { email, phone, password: hashedPassword }
            )

        if (!registeredUser) {
            return httpResponse.serverError(response, "Register transaction failed!")
        }

        return httpResponse.created(
            response,
            "Register success!",
            registeredUser,
            {
                self: "/auth/register",
                login: "/auth/login"
            }
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Register failed: " + error.message
        )
    }
}