import { verifyToken } from "../lib/jwt.js"
import * as userProfilesModel from "../models/user_profiles.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getUserProfileById(request, response) {
    const authHeader = request.headers.authorization
    console.log(authHeader)
    const prefix = "Bearer "
    const isBearer = authHeader?.startsWith(prefix)
    if (isBearer) {
        const token = authHeader.slice(prefix.length)
        const payload = verifyToken(token)
        if (!payload) {
            response.json({
                success: true,
                message: "Failed get current user profile! token invalid",
                result: null
            })       
        }
        try {
            const userProfile = await userProfilesModel.getUserProfileById(payload.id)
            response.json({
                success: true,
                message: "Success get current user profile!",
                result: userProfile
            })
        } catch (error) {
            response.json({
                success: true,
                message: "Failed get current user profile! " + error,
                result: null
            })       
        }
    }
}