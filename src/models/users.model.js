import db from "../lib/db.js"

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {number} role_id
 * @property {boolean} verified
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @return {User[]}
 */
export async function getAllUsers() {
    const sql = "SELECT users.id, user_profiles.user_avatar, user_profiles.first_name, user_profiles.last_name, user_credentials.email, user_credentials.phone, user_profiles.address, users.verified, roles.role_name, users.created_at, users.updated_at FROM users JOIN roles ON roles.id = users.role_id JOIN user_profiles ON user_profiles.user_id = users.id JOIN user_credentials ON user_credentials.user_id = users.id"
    const rows = await (await db().query("SELECT * FROM users")).rows
    return rows
}

/**
 * @param {number} id 
 * @returns {User}
 */
export async function getUserById(id) {

    const foundIndex = usersData.findIndex(user => user.id === parseInt(id))

    if (foundIndex !== -1) {
        return [usersData[foundIndex], foundIndex]
    } else {
        throw new Error("Users not found !");
    }
}

/**
 * 
 * @param {string} email 
 * @returns {User}
 */
export async function getUserByEmail(email) {
    const foundIndex = usersData.findIndex(user => user.email === email)

    if (foundIndex !== -1) {
        return [usersData[foundIndex], foundIndex]
    } else {
        return [null, null]
    }
}

/**
 * 
 * @param {User} data 
 * @returns 
 */
export async function createUsers() {
    const sql = `INSERT INTO users (role_id, verified) VALUES ($1, $2) RETURNING id, role_id, verified, created_at, updated_at;`
    const role_id = 2
    const verified = true
    const data = [role_id, verified]
    const result = await db().query(sql, data)
    return result.rows
}

/**
 * 
 * @param {number} id 
 * @param {User} data 
 */
export async function updateUser(id, newData) {
    const foundIndex = usersData.findIndex(user => user.id === parseInt(id))

    if (foundIndex !== -1) {
        usersData[foundIndex] = {
            ...usersData[foundIndex],
            ...newData
        }

        return usersData[foundIndex]
    } else {
        throw new Error("Users not found !");
    }
}

export async function deleteUser(id) {
    const [user, index] = await getUserById(id)
    usersData.splice(index, 1)
    return user
}