import * as userProfilesModel from "../models/user_profiles.model.js"
import { httpResponse } from "../lib/http_handlers.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getUserProfileById(request, response) {
    const user = response.locals.userData

    try {
        const { id, user_id, ...userProfile } = await userProfilesModel.getUserProfileById(user.id)

        return httpResponse.ok(
            response,
            "Success get current user profile!",
            userProfile
        )
    } catch (error) {
        return httpResponse.serverError(
            response,
            "Failed get current user profile! " + error
        )
    }
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function updateUserProfile(request, response) {
    const user = response.locals.userData

    const userCurrentProfile = await userProfilesModel.getUserProfileById(user.id)

    const { user_avatar, first_name, last_name, address } = request.body

    if (first_name !== undefined && first_name.length < 4) {
        return httpResponse.badRequest(
            response,
            "First name must be at least 4 characters long"
        )
    }

    if (last_name !== undefined && last_name.length < 4) {
        return httpResponse.badRequest(
            response,
            "Last name must be at least 4 characters long"
        )
    }

    if (address !== undefined && address.length < 10) {
        return httpResponse.badRequest(
            response,
            "Address must be at least 10 characters long"
        )
    }

    if (user_avatar !== undefined && user_avatar.length < 10) {
        return httpResponse.badRequest(
            response,
            "User avatar url must be at least 10 characters long"
        )
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

        return httpResponse.ok(
            response,
            "Success update current user profile!",
            userProfile
        )
    } catch (error) {
        return httpResponse.serverError(
            response,
            "Failed update current user profile! " + error
        )
    }
}