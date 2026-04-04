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

/**
 * 
 * @param {string} email 
 * @returns {ForgotPassword}
 */
export async function GetLatestOTP(email) {
    const client = await db().connect()

    try {
        const sql = `SELECT id, email, code_otp, created_at, updated_at FROM forgot_password WHERE email = $1 ORDER BY created_at DESC, id DESC LIMIT 1`
        const data = [email]
        const result = await client.query(sql, data)
        return result.rows[0] ?? null
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}

/**
 * 
 * @param {string} email 
 * @returns {ForgotPassword}
 */
export async function deleteOTPByEmail(email) {
    const client = await db().connect()

    try {
        const sql = `DELETE FROM forgot_password WHERE email = $1 RETURNING id, email, code_otp, created_at, updated_at`
        const data = [email]
        const result = await client.query(sql, data)
        return result.rows[0] ?? null
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}