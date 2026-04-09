import db from "../lib/db.js"

/**
 * @typedef {Object} ProductReview
 * @property {number} id
 * @property {number} product_id
 * @property {number} user_id
 * @property {number} rating
 * @property {string} messages
 * @property {string} created_at
 * @property {string} updated_at
 */


/**
 * @return {ProductReview[]}
 */
export async function getAllProductsReviews() {
    const sql = `SELECT id, product_id, user_id, rating, messages, created_at, updated_at FROM product_reviews`
    const result = await db().query(sql)
    return result.rows[0] ?? null
}