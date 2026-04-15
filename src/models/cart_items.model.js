import db from "../lib/db.js"

/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {number} cart_id
 * @property {number} product_id
 * @property {number} size_id
 * @property {number} variant_id
 * @property {number} quantity
 * @property {string} created_at
 * @property {string} updated_at
 */


/**
 * 
 * @param {CartItem} cartItem
 * @returns {CartItem}
 */
export async function createCartItem({ cart_id, product_id, size_id, variant_id, quantity }) {
    const now = new Date()
    const sql = `INSERT INTO cart_items (cart_id, product_id, size_id, variant_id, quantity, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, cart_id, product_id, size_id, variant_id, quantity, created_at, updated_at;`
    const values = [cart_id, product_id, size_id, variant_id, quantity, now, now]
    const result = await db().query(sql, values)
    return result.rows[0] ?? null
}

/**
 * 
 * @param {number} cart_id
 * @returns {CartItem[]}
 */
export async function getAllCartItemsByCartId({ cart_id }) {
    const sql = `SELECT id, cart_id, product_id, size_id, variant_id, quantity, created_at, updated_at FROM cart_items WHERE cart_id = $1;`
    const values = [cart_id]
    const result = await db().query(sql, values)
    return result.rows ?? []
}

/**
 * 
 * @param {number} id
 * @returns {CartItem}
 */
export async function deleteCartItem({ id, cart_id }) {
    const sql = `DELETE FROM cart_items WHERE id = $1 AND cart_id = $2 RETURNING id, cart_id, product_id, size_id, variant_id, quantity, created_at, updated_at;`
    const values = [id, cart_id]
    const result = await db().query(sql, values)
    return result.rows[0] ?? null
}