import crypto from "crypto"
import * as userCredentialsModel from "../models/user_credentials.model.js"
import * as forgotPasswordModel from "../models/forgot_password.model.js"
import { GenerateHash } from "../lib/hash.js"
import { httpResponse } from "../lib/http_handlers.js"

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function requestForgotPassword(request, response) {
    const { email } = request.body

    if (!email || !email.includes("@")) {
        return httpResponse.badRequest(response, "Invalid email format")
    }

    try {
        const user = await userCredentialsModel.getUserCredentialsByEmail(email)

        // ⚠️ security best practice: jangan reveal user exist or not
        if (!user) {
            return httpResponse.ok(
                response,
                "If email exists, OTP has been sent"
            )
        }

        const otp = crypto.randomInt(100000, 1000000)

        const forgotPasswordRequest =
            await forgotPasswordModel.CreateForgotPassword(user.email, otp)

        if (!forgotPasswordRequest) {
            return httpResponse.serverError(
                response,
                "Failed to create forgot password request"
            )
        }

        return httpResponse.ok(
            response,
            "OTP has been generated",
            forgotPasswordRequest
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Request forgot password failed: " + error.message
        )
    }
}

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function resetPassword(request, response) {
    const { email, code_otp, new_password, password_confirm } = request.body

    if (!email || !email.includes("@")) {
        return httpResponse.badRequest(response, "Invalid email format")
    }

    if (!new_password || new_password.length < 8) {
        return httpResponse.badRequest(response, "Password minimum 8 characters")
    }

    if (new_password !== password_confirm) {
        return httpResponse.badRequest(response, "Password confirmation mismatch")
    }

    if (!code_otp) {
        return httpResponse.badRequest(response, "OTP code is required")
    }

    try {
        const user = await userCredentialsModel.getUserCredentialsByEmail(email)

        if (!user) {
            return httpResponse.notFound(response, "User not found")
        }

        const latestOtp = await forgotPasswordModel.GetLatestOTP(email)

        if (!latestOtp) {
            return httpResponse.badRequest(response, "OTP not found or expired")
        }

        if (parseInt(latestOtp.code_otp) !== parseInt(code_otp)) {
            return httpResponse.unauthorized(response, "Invalid OTP")
        }

        const hashedPassword = await GenerateHash(new_password)

        const updatedUser =
            await userCredentialsModel.updatePasswordByEmail(email, {
                password: hashedPassword
            })

        if (!updatedUser) {
            return httpResponse.serverError(response, "Failed to update password")
        }

        await forgotPasswordModel.deleteOTPByEmail(email)

        return httpResponse.ok(response, "Password reset success")

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Reset password failed: " + error.message
        )
    }
}