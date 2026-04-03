import * as userModel from "../models/users.model.js"
import * as userCredentialsModel from "../models/user_credentials.model.js"
import { generateToken } from "../lib/jwt.js"
import { GenerateHash, VerifyHash } from "../lib/hash.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function login(request, response) {
    const { email, password } = request.body
    if (email !== "" && email.includes("@")) {
        try {
            const userCredentials = await userCredentialsModel.getUserCredentialsByEmail(email)
            if (!userCredentials) {
                response.json(
                    {
                        success: false,
                        messages: "Login fail! wrong email or password",
                        result: null
                    }
                )
                return
            }

            if (!(await VerifyHash(userCredentials.password, password))) {
                response.json(
                    {
                        success: false,
                        messages: "Login fail! wrong email or password",
                        result: null
                    }
                )
                return
            }
            const token = generateToken({ id: userCredentials.user_id })

            response.json(
                {
                    success: true,
                    messages: "Login success!",
                    result: token
                }
            )
        } catch (error) {
            response.json(
                {
                    success: false,
                    messages: "Login failed! " + error,
                    result: null
                }
            )
        }
    } else {
        response.json(
            {
                success: false,
                messages: "Login failed! email invalid",
                result: null
            }
        )
    }
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function register(request, response) {
    const { first_name, last_name, address, phone, email, password, confirm_password } = request.body

    if (first_name === undefined || first_name.length < 4) {
        response.json({
            success: false,
            message: "Register failed : First Name minimum 4 characters",
            result: null
        })
        return
    }

    if (last_name === undefined || last_name.length < 4) {
        response.json({
            success: false,
            message: "Register failed :Last Name minimum 4 characters",
            result: null
        })
        return
    }

    if (phone === undefined || phone.length < 10) {
        response.json({
            success: false,
            message: "Register failed : Phone Number minimum 10 digits",
            result: null
        })
        return
    }

    if (address === undefined || address.length < 10) {
        response.json({
            success: false,
            message: "Register failed : Address minimum 10 characters",
            result: null
        })
        return
    }

    if (email === undefined || !email.includes("@")) {
        response.json({
            success: false,
            message: "Register failed : Invalid email",
            result: null
        })
        return
    }

    if (password === undefined || password.length < 8) {
        response.json({
            success: false,
            message: "Register failed : Password too weak! minimum 8 characters",
            result: null
        })
        return
    }

    if (confirm_password !== password) {
        response.json({
            success: false,
            message: "Register failed : Confirm password not match",
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

        const hashedPassword = await GenerateHash(password)
        const registeredUser = await userModel.createUsersWithProfileAndCredentials({ first_name, last_name, address }, { email, phone, password: hashedPassword })
        if (!registeredUser) {
            throw new Error("Register transaction fail!");
        }

        response.json({
            success: true,
            message: "Register success !",
            result: registeredUser
        })
    } catch (error) {
        response.json({
            success: true,
            message: "Registers fail !" + error,
            result: null
        })
    }
}