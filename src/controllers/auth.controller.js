import * as userModel from "../models/users.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function login(request, response) {
    const { email, password } = request.body
    if (email !== "" && email.includes("@")) {
        try {
            const [user, index] = await userModel.getUserByEmail(email)
            if (!user) {
                response.json(
                    {
                        success: false,
                        messages: "Login fail! wrong email or password",
                        result: null
                    }
                )
                return
            }

            if (user.password !== password) {
                response.json(
                    {
                        success: false,
                        messages: "Login fail! wrong email or password",
                        result: null
                    }
                )
                return
            }

            response.json(
                {
                    success: true,
                    messages: "Login success!",
                    result: user
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

    const [user, index] = await userModel.getUserByEmail(email)

    if (user) {
        response.json(
            {
                success: false,
                messages: "Register fail! email allready exist",
                result: null
            }
        )
        return
    }
    const newUser = await userModel.createUsers({email, password})
    response.json({
        success: true,
        message: "Register success!",
        result: newUser
    })
}