import db from "../lib/db.js"

/**
 * @typedef {Object} User
 * @property {number}  id
 * @property {number}  role_id
 * @property {boolean} verified
 * @property {string}  created_at
 * @property {string}  updated_at
 */

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
    return result.rows[0] ?? null
}

/**
 * 
 * @param {UserProfile} userProfile 
 * @param {UserCredentials} userCredentials 
 * @returns {User}
 */
export async function createUsersWithProfileAndCredentials(userProfile, userCredentials) {
    const client = await db().connect()
    try {
        const now = new Date()
        await client.query(`BEGIN`)
        const sqlUser = `INSERT INTO users (role_id, verified) VALUES ($1, $2) RETURNING id, role_id, verified, created_at, updated_at;`
        const role_id = 2
        const verified = true
        const data = [role_id, verified]
        const user = await client.query(sqlUser, data)
        const user_id = user.rows[0].id

        const sqlUserProfile = `INSERT INTO user_profiles (user_avatar, user_id, first_name, last_name, address, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id, user_avatar, first_name, last_name, address;`
        const user_avatar = "https://i.pravatar.cc/400?img=4"
        const { first_name, last_name, address } = userProfile
        const registeredUserProfile = await client.query(sqlUserProfile, [user_avatar, user_id, first_name, last_name, address, now, now])

        const sqlUserCredentials = `INSERT INTO user_credentials (user_id, email, phone, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, email, phone, created_at, updated_at;`
        const { email, phone, password } = userCredentials
        const registeredUserCredentials = await client.query(sqlUserCredentials, [user_id, email, phone, password, now, now])

        const sqlCart = `INSERT INTO carts (user_id, created_at, updated_at) VALUES ($1, $2, $3) RETURNING id;`
        const registeredCart = await client.query(sqlCart, [user_id, now, now])

        const registeredUser = {
            id: user.rows[0].id,

            user_avatar: registeredUserProfile.rows[0].user_avatar,
            first_name: registeredUserProfile.rows[0].first_name,
            last_name: registeredUserProfile.rows[0].last_name,
            address: registeredUserProfile.rows[0].address,

            email: registeredUserCredentials.rows[0].email,
            phone: registeredUserCredentials.rows[0].phone,

            verified: user.rows[0].verified,
            role_id: user.rows[0].role_id,
            cart_id: registeredCart.rows[0].id,
            created_at: user.rows[0].created_at,
            updated_at: user.rows[0].updated_at,
        }
        await client.query(`COMMIT`)
        return registeredUser
    } catch (error) {
        await client.query(`ROLLBACK`)
        throw error
    } finally {
        client.release()
    }
}

/**
 * @return {User[]}
 */
export async function getAllUsers() {
    const sql = "SELECT users.id, user_profiles.user_avatar, user_profiles.first_name, user_profiles.last_name, user_credentials.email, user_credentials.phone, user_profiles.address, users.verified, roles.role_name, users.created_at, users.updated_at FROM users JOIN roles ON roles.id = users.role_id JOIN user_profiles ON user_profiles.user_id = users.id JOIN user_credentials ON user_credentials.user_id = users.id"
    const result = await db().query("SELECT * FROM users")
    return result.rows[0] ?? null
}

/**
 * @param {number} id 
 * @returns {User}
 */
export async function getUserById(id) {
    const sql = `SELECT id, role_id, verified, created_at, updated_at FROM users WHERE id = $1`
    const result = await db().query(sql, [id])
    return result.rows[0] ?? null
}

/**
 * 
 * @param {number} id 
 * @param {User} data 
 */
export async function updateUser(id, newData) {

}

export async function deleteUser(id) {

}