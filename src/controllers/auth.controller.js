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
    const { email, password } = request.body
    if (email === "" && !email.includes("@")) {
        response.status(400).json({
            success: false,
            messages: "Register fail! email invalid",
            result: null
        })
    }

    if (password.length < 8) {
        response.status(400).json({
            success: false,
            messages: "Register fail! password too weak minimal 8 characters",
            result: null
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
    } catch { }

    const hashedPassword = await GenerateHash(password)

    const newUser = await userModel.createUsersWithProfileAndCredentials({ email, password: hashedPassword })
    const token = await generateToken({ user_id: newUser.id })
    response.json({
        success: true,
        message: "Register success!",
        result: token
    })
}