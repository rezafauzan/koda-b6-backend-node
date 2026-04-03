import db from "../lib/db.js";
/**
 * @typedef {Object} UserProfile
 * @property {number} id
 * @property {number} user_id
 * @property {string} user_avatar
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} address
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @param {number} id 
 * @returns {UserProfile}
 */
export async function getUserProfileById(id) {
    const sql = `SELECT id, user_id, user_avatar, first_name, last_name, address, created_at, updated_at FROM user_profiles WHERE user_id = $1`
    const values = [id]
    const result = await db().query(sql, values)
    if (result.rows.length > 0) {
        return result.rows[0]
    } else {
        throw new Error("User profile not found !");
    }
}

/**
 * 
 * @param {number} id 
 * @param {User} data 
 */
export async function updateUserProfile(newUserProfileData) {
    const sql = `UPDATE user_profiles SET user_avatar = $1, first_name = $2, last_name = $3, address = $4, updated_at = $5 WHERE user_id = $6 RETURNING id, user_id, user_avatar, first_name, last_name, address, created_at, updated_at`
    const values = [ newUserProfileData.user_avatar, newUserProfileData.first_name, newUserProfileData.last_name, newUserProfileData.address, newUserProfileData.updated_at, newUserProfileData.user_id]
    const result = await db().query(sql, values)
    console.log(result)

    if (result.rows.length > 0) {
        return await result.rows[0]
    } else {
        throw new Error("Users not found !");
    }
}