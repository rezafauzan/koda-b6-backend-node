import * as userModel from "../models/users.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} respond 
 */
export async function getAllUsers(request, respond){
    const users = await userModel.getAllUsers()
    respond.json({
        success: true,
        message: "Get all users data",
        result: users
    })
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} respond 
 */
export async function createUsers(request, respond){
    const data = request.body
    const users = await userModel.createUsers(data)
    respond.json({
        success: true,
        message: "Create user success !",
        result: users
    })
}