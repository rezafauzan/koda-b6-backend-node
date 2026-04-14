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

/**
 * @return {ProductReview[]}
 */
export async function getPopularProducts() {
    const sql = `SELECT products.id, products.category_id, products.name, products.description, products.price, products.stock, products.created_at, products.updated_at, product_reviews.total_reviews FROM products JOIN (SELECT product_id, COUNT(product_id) AS total_reviews FROM product_reviews GROUP BY product_id ORDER BY total_reviews DESC LIMIT $1) AS product_reviews ON products.id = product_reviews.product_id ORDER BY product_reviews.total_reviews DESC`
    const limit = 4
    const values = [limit]
    const result = await db().query(sql, values)
    return result.rows[0] ?? null
}