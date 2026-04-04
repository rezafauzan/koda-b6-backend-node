import db from "../lib/db.js"

/**
 * @typedef {Object} UserCredentials
 * @property {number} id
 * @property {number} user_id
 * @property {string} email
 * @property {string} phone
 * @property {string} password
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @param {number} userId
 * @returns {UserCredentials}
 */
export async function getUserCredentialsByUserId(userId) {
    const sql = `SELECT id, user_id, email, phone, password, created_at, updated_at FROM user_credentials WHERE user_id = $1`
    const values = [userId]
    const result = await db().query(sql, values)
    return result.rows[0] ?? null
}

/**
 * 
 * @param {string} email 
 * @returns {UserCredentials}
*/
export async function getUserCredentialsByEmail(email) {
    const sql = `SELECT user_id, email, phone, password, created_at, updated_at FROM user_credentials WHERE email = $1`
    const values = [email]
    const result = await db().query(sql, values)
    return result.rows[0] ?? null
}

/**
 * @param {Object} newUserCredentialsData
 * @param {number} newUserCredentialsData.user_id
 * @param {string} newUserCredentialsData.email
 * @param {string} newUserCredentialsData.phone
 * @param {string} newUserCredentialsData.password
 * @param {string} newUserCredentialsData.updated_at
 * @returns {Promise<UserCredentials>}
 */
export async function updateUserCredentials(newUserCredentialsData) {
    const sql = `UPDATE user_credentials SET email = $1, phone = $2, password = $3, updated_at = $4 WHERE user_id = $5 RETURNING id, user_id, email, phone, password, created_at, updated_at`
    const values = [newUserCredentialsData.email, newUserCredentialsData.phone, newUserCredentialsData.password, newUserCredentialsData.updated_at, newUserCredentialsData.user_id]
    const result = await db().query(sql, values)
    return result.rows[0] ?? null
}

/**
 * 
 * @param {string} email
 * @param {string} newPassword
 * @returns {UserCredentials}
 */
export async function updatePasswordByEmail(email, newPassword) {
    const client = await db().connect()

    try {
        const now = new Date()
        const sql = `UPDATE user_credentials SET password = $1, updated_at = $2 WHERE email = $3 RETURNING id, user_id, email, phone, password, created_at, updated_at`
        const data = [newPassword, now, email]
        const result = await client.query(sql, data)
        return result.rows[0] ?? null
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}