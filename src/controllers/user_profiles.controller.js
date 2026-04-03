import { verifyToken } from "../lib/jwt.js"
import * as userProfilesModel from "../models/user_profiles.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getUserProfileById(request, response) {
    const authHeader = request.headers.authorization
    const prefix = "Bearer "
    const isBearer = authHeader?.startsWith(prefix)
    if (isBearer) {
        const token = authHeader.slice(prefix.length)
        const payload = verifyToken(token)
        if (!payload) {
            response.json({
                success: false,
                message: "Failed get current user profile! token invalid",
                result: null
            })
        }
        try {
            const { id, user_id, ...userProfile } = await userProfilesModel.getUserProfileById(payload.id)
            response.json({
                success: true,
                message: "Success get current user profile!",
                result: userProfile
            })
        } catch (error) {
            response.json({
                success: false,
                message: "Failed get current user profile! " + error,
                result: null
            })
        }
    }
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function updateUserProfile(request, response) {
    const authHeader = request.headers.authorization
    const prefix = "Bearer "
    const isBearer = authHeader?.startsWith(prefix)
    if (isBearer) {
        const token = authHeader.slice(prefix.length)
        const payload = verifyToken(token)
        if (!payload) {
            response.json({
                success: false,
                message: "Failed update current user profile! token invalid",
                result: null
            })
        }

        const userCurrentProfile = await userProfilesModel.getUserProfileById(payload.id)

        const { user_avatar, first_name, last_name, address } = request.body

        if (first_name !== undefined && first_name.length < 4) {
            return response.status(400).json({
                success: false,
                message: "First name must be at least 4 characters long"
            })
        }

        if (last_name !== undefined && last_name.length < 4) {
            return response.status(400).json({
                success: false,
                message: "Last name must be at least 4 characters long"
            })
        }

        if (address !== undefined && address.length < 10) {
            return response.status(400).json({
                success: false,
                message: "Address must be at least 10 characters long"
            })
        }

        if (user_avatar !== undefined && user_avatar.length < 10) {
            return response.status(400).json({
                success: false,
                message: "User avatar url must be at least 10 characters long"
            })
        }

        const newUserProfileData = {
            user_id: userCurrentProfile.id,
            user_avatar: user_avatar ?? userCurrentProfile.user_avatar,
            first_name: first_name ?? userCurrentProfile.first_name,
            last_name: last_name ?? userCurrentProfile.last_name,
            address: address ?? userCurrentProfile.address,
            updated_at: new Date()
        }

        try {
            const userProfile = await userProfilesModel.updateUserProfile(newUserProfileData)
            response.json({
                success: true,
                message: "Success update current user profile!",
                result: userProfile
            })
        } catch (error) {
            response.json({
                success: false,
                message: "Failed update current user profile! " + error,
                result: null
            })
        }

    }
}