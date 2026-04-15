import db from "../lib/db.js"
import redisClient from "../lib/redis.js"

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {number} category_id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {number} stock
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * 
 * @param {number} category_id
 * @param {string} name
 * @param {string} description
 * @param {number} price
 * @param {number} stock
 * @returns {Product[]}
 */
export async function createProduct({ category_id, name, description, price, stock }) {
    const sql = `INSERT INTO products (category_id, name, description, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING id, category_id, name, description, price, stock, created_at, updated_at;`
    const values = [category_id, name, description, price, stock]
    const result = await db().query(sql, values)

    await redisClient.del("products")

    return result.rows ?? []
}

/**
 * 
 * @returns {Product[]}
 */
export async function getAllProducts() {
    const cacheKey = "products"
    const cache = await redisClient.get(cacheKey)
    if (cache) {
        return JSON.parse(cache)
    }


    const sql = `SELECT id, category_id, name, description, price, stock, created_at, updated_at FROM products;`
    const values = []
    const result = await db().query(sql, values)
    const data = result.rows ?? null

    await redisClient.set(cacheKey, JSON.stringify(data), {
        EX: 900
    })

    return data
}

/**
 * 
 * @param {number} category_id
 * @returns {Product[]}
 */
export async function getProductsByCategoryId({ category_id }) {
    const sql = `SELECT id, category_id, name, description, price, stock, created_at, updated_at FROM products WHERE category_id = $1;`
    const values = [category_id]
    const result = await db().query(sql, values)
    return result.rows ?? null
}

/**
 * 
 * @param {string} name
 * @returns {Product[]}
 */
export async function getProductsByName({ name }) {
    const sql = `SELECT id, category_id, name, description, price, stock, created_at, updated_at FROM products WHERE name ILIKE $1;`
    const values = [`%${name}%`]
    const result = await db().query(sql, values)
    return result.rows ?? []
}

/**
 * 
 * @param {number} id
 * @param {number} category_id
 * @param {string} name
 * @param {string} description
 * @param {number} price
 * @param {number} stock
 * @returns {Product[]}
 */
export async function updateProduct({ id, category_id, name, description, price, stock }) {
    const sql = `UPDATE products SET category_id = $1, name = $2, description = $3, price = $4, stock = $5, updated_at = now() WHERE id = $6 RETURNING id, category_id, name, description, price, stock, created_at, updated_at;`
    const values = [category_id, name, description, price, stock, id]
    const result = await db().query(sql, values)
    await redisClient.del("products")
    return result.rows ?? null
}

/**
 * 
 * @param {number} id
 * @returns {Product[]}
 */
export async function deleteProduct({ id }) {
    const sql = `DELETE FROM products WHERE id = $1 RETURNING id, category_id, name, description, price, stock, created_at, updated_at;`
    const values = [id]
    const result = await db().query(sql, values)
    return result.rows ?? []
}