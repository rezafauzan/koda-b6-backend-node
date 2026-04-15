import db from "../lib/db.js"

/**
 * @typedef {Object} Role
 * @property {number} id
 * @property {string} role_name
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * 
 * @param {Role} role
 * @returns {Role}
 */
export async function createRole({ role_name }) {
    const now = new Date()
    const sql = `INSERT INTO roles (role_name, created_at, updated_at) VALUES ($1, $2, $3) RETURNING id, role_name, created_at, updated_at;`
    const values = [role_name, now, now]
    const result = await db().query(sql, values)
    return result.rows[0] ?? null
}

/**
 * 
 * @returns {Role[]}
 */
export async function getAllRoles() {
    const sql = `SELECT id, role_name, created_at, updated_at FROM roles ORDER BY id ASC;`
    const result = await db().query(sql)
    return result.rows ?? []
}

/**
 * 
 * @param {Role} role
 * @returns {Role}
 */
export async function getRoleByName({ role_name }) {
    const sql = `SELECT id, role_name, created_at, updated_at FROM roles WHERE role_name ILIKE $1;`
    const values = [`%${role_name}%`]
    const result = await db().query(sql, values)
    return result.rows[0] ?? null
}

/**
 * 
 * @param {Role} role
 * @returns {Role}
 */
export async function updateRole({ id, role_name }) {
    const sql = `UPDATE roles SET role_name = $1, updated_at = now() WHERE id = $2 RETURNING id, role_name, created_at, updated_at;`
    const values = [role_name, id]
    const result = await db().query(sql, values)
    return result.rows[0] ?? null
}

/**
 * 
 * @param {Role} role
 * @returns {Role}
 */
export async function deleteRole({ id }) {
    const sql = `DELETE FROM roles WHERE id = $1 RETURNING id, role_name, created_at, updated_at;`
    const values = [id]
    const result = await db().query(sql, values)
    return result.rows[0] ?? null
}