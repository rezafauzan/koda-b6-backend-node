/**
 * @typedef {Object} CheckoutPayload
 * @property {string} fullname
 * @property {string} phone
 * @property {string} email
 * @property {string} address
 * @property {string} delivery
 */

/**
 * @typedef {Object} CheckoutResult
 * @property {number} id
 * @property {number} cart_id
 * @property {number} total
 * @property {number} status
 * @property {string} fullname
 * @property {string} phone
 * @property {string} email
 * @property {string} address
 * @property {string} delivery
 * @property {string} created_at
 * @property {string} updated_at
 * @property {OrderItem[]} items
 */

/**
 * 
 * @param {number} user_id
 * @param {CheckoutPayload} payload
 * @returns {Promise<CheckoutResult>}
 */
export async function checkoutOrder(user_id, payload) {
    const client = await db().connect()
    try {
        const now = new Date()
        const { fullname, phone, email, address, delivery } = payload

        await client.query(`BEGIN`)
        const sqlCart = `SELECT id FROM carts WHERE user_id = $1 LIMIT 1;`
        const cartResult = await client.query(sqlCart, [user_id])
        if (!cartResult.rows.length) throw new Error("Cart not found")

        const cart_id = cartResult.rows[0].id
        const sqlItems = `SELECT ci.*, p.name AS product_name, p.image AS product_image, p.base_price, v.name AS variant_name, v.price AS variant_price, s.name AS size_name, s.price AS size_price FROM cart_items ci JOIN products p ON ci.product_id = p.id LEFT JOIN variants v ON ci.variant_id = v.id LEFT JOIN sizes s ON ci.size_id = s.id WHERE ci.cart_id = $1;`
        const itemsResult = await client.query(sqlItems, [cart_id])

        if (!itemsResult.rows.length) throw new Error("Cart is empty")
        const sqlOrder = `INSERT INTO orders (cart_id, total, status, fullname, phone, email, address, delivery, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id, cart_id, total, status, fullname, phone, email, address, delivery, created_at, updated_at;`
        const orderResult = await client.query(sqlOrder, [cart_id, 0, 1, fullname, phone, email, address, delivery, now, now])

        const order = orderResult.rows[0]
        let total = 0
        const orderItems = []
        for (const item of itemsResult.rows) {
            const unit_base_price = item.base_price
            const variant_price = item.variant_price || 0
            const portion_price = item.size_price || 0
            const unit_final_price = unit_base_price + variant_price + portion_price
            const total_price = unit_final_price * item.quantity

            total += total_price

            const sqlOrderItem = `INSERT INTO order_items (order_id, product_id, product_name, product_image, variant_name, portion_size, quantity, unit_base_price, variant_price, portion_price, unit_final_price, total_price, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id, order_id, product_id, product_name, quantity, total_price;`
            const values = [order.id, item.product_id, item.product_name, item.product_image, item.variant_name, item.size_name, item.quantity, unit_base_price, variant_price, portion_price, unit_final_price, total_price, now, now]
            const orderItemResult = await client.query(sqlOrderItem, values)
            orderItems.push(orderItemResult.rows[0])
        }

        const sqlUpdateOrder = `UPDATE orders SET total = $1, updated_at = $2 WHERE id = $3 RETURNING total;`
        await client.query(sqlUpdateOrder, [total, now, order.id])
        const sqlDeleteCartItems = `DELETE FROM cart_items WHERE cart_id = $1;`
        await client.query(sqlDeleteCartItems, [cart_id])

        await client.query(`COMMIT`)

        const response = {
            id: order.id,
            cart_id: order.cart_id,
            total,
            status: order.status,
            fullname: order.fullname,
            phone: order.phone,
            email: order.email,
            address: order.address,
            delivery: order.delivery,
            items: orderItems,
            created_at: order.created_at,
            updated_at: now
        }

        return response
    } catch (error) {
        await client.query(`ROLLBACK`)
        throw error
    } finally {
        client.release()
    }
}