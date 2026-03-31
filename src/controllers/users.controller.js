import * as userModel from "../models/users.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getAllUsers(request, response){
    const users = await userModel.getAllUsers()
    response.json({
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
    if(!data.email.includes("@")){
        respond.json({
            success: false,
            message: "Create user failed : Invalid email",
            result: null
        })
        return
    }
    if(!data.password.length >= 8){
        respond.json({
            success: false,
            message: "Create user failed : Password too weak! minimum 8 characters",
            result: null
        })
        return
    }

    const users = await userModel.createUsers(data)
    respond.json({
        success: true,
        message: "Create user success !",
        result: users
    })
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} respond 
 */
export async function deleteUser(request, respond){
    try {
        const user = await userModel.deleteUser(request.params.id)
        respond.json({
            success: true,
            message: "Delete users success !",
            result: user
        })
        
    } catch (error) {
        respond.json({
            success: true,
            message: "Delete users fail !" + error,
            result: null
        })
    }
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} respond 
 */
export async function updateUser(request, respond){
    try {
        const user = await userModel.updateUser(request.params.id, request.body)
        respond.json({
            success: true,
            message: "Update users success !",
            result: user
        })
        
    } catch (error) {
        respond.json({
            success: true,
            message: "Update users fail !" + error,
            result: null
        })
    }
}