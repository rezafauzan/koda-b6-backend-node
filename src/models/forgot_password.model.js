import db from "../lib/db.js"
/**
 * @typedef {Object} ForgotPassword
 * @property {number}  id
 * @property {string}  email
 * @property {number}  code_otp
 * @property {string}  created_at
 * @property {string}  updated_at
 */

/**
 * 
 * @param {string} email 
 * @param {number} codeOtp 
 * @returns {ForgotPassword}
 */
export async function CreateForgotPassword(email, codeOtp) {
    const client = await db().connect()

    try {
        const now = new Date()
        const sql = `INSERT INTO forgot_password (email, code_otp, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING id, email, code_otp, created_at, updated_at`
        const data = [email, codeOtp, now, now]
        const result = await client.query(sql, data)
        return result.rows[0] ?? null
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}