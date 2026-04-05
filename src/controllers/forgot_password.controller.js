import crypto from "crypto";
import * as userCredentialsModel from "../models/user_credentials.model.js";
import * as forgotPasswordModel from "../models/forgot_password.model.js"
import { GenerateHash } from "../lib/hash.js"

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function requestForgotPassword(request, response) {
    const { email } = request.body;

    if (email === undefined || !email.includes("@")) {
        response.json({
            success: false,
            message: "Request forgot password failed : Invalid email format !",
            result: null
        });
        return;
    }

    try {
        const user = await userCredentialsModel.getUserCredentialsByEmail(email);

        if (!user) {
            throw new Error("User not registered !")
        }

        const otp = crypto.randomInt(100000, 1000000);

        const forgotPasswordRequest = await forgotPasswordModel.CreateForgotPassword(user.email, otp)

        if (!forgotPasswordRequest) {
            throw new Error("Failed to create forgot password data");
        }

        response.json({
            success: true,
            message: "Request forgot password success !",
            result: forgotPasswordRequest
        })

    } catch (error) {
        response.json({
            success: false,
            message: "Request forgot password failed ! " + error.message,
            result: null
        });
    }
}

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function resetPassword(request, response) {
    try {
        const { email, code_otp, new_password, password_confirm } = request.body;
        if (!email || !email.includes("@")) {
            throw new Error("Invalid email format !");
        }

        if (!new_password || new_password.length < 8) {
            throw new Error("Password too weak minimum length is 8 characters !");
        }

        if (new_password !== password_confirm) {
            throw new Error("Password confirmation mismatch !");
        }

        const user = await userCredentialsModel.getUserCredentialsByEmail(email);

        if (!user) {
            throw new Error("User not registered !");
        }

        const latestOtp = await forgotPasswordModel.GetLatestOTP(email);

        if (!latestOtp) {
            throw new Error("Invalid OTP !");
        }

        if (parseInt(latestOtp.code_otp) !== parseInt(code_otp)) {
            throw new Error("Invalid OTP !");
        }

        const hashedPassword = await GenerateHash(new_password)

        const updatedUser = await userCredentialsModel.updatePasswordByEmail(email,{hashedPassword})
        if (!updatedUser) {
            throw new Error("Failed to update password !");
        }

        await forgotPasswordModel.deleteOTPByEmail(email);

        response.json({
            success: true,
            message: "Reset password success !",
            result: null
        });

    } catch (error) {
        response.json({
            success: false,
            message: "Reset password failed ! " + error.message,
            result: null
        });
    }
}