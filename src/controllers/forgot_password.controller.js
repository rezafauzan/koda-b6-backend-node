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