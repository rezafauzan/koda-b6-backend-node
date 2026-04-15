import * as cartItemModel from "../models/cart_items.model.js"
import { httpResponse } from "../lib/http_handlers.js"

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function createCartItem(request, response) {
    const { product_id, size_id, variant_id, quantity } = request.body
    const { cart_id } = response.locals.userData || {}

    if (!cart_id) {
        return httpResponse.unauthorized(response, "Invalid session, please relogin!")
    }

    if (!product_id) {
        return httpResponse.badRequest(response, "Product is required")
    }

    if (!size_id) {
        return httpResponse.badRequest(response, "Size is required")
    }

    if (!variant_id) {
        return httpResponse.badRequest(response, "Variant is required")
    }

    if (!quantity || quantity < 1) {
        return httpResponse.badRequest(response, "Quantity minimum is 1")
    }

    try {
        const createdCartItem = await cartItemModel.createCartItem({
            cart_id,
            product_id,
            size_id,
            variant_id,
            quantity
        })

        if (!createdCartItem) {
            return httpResponse.serverError(response, "Add to cart failed")
        }

        return httpResponse.created(
            response,
            "Add to cart success",
            createdCartItem
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Add to cart failed: " + error.message
        )
    }
}

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getAllCartItemsByCartId(request, response) {
    const { cart_id } = response.locals.userData || {}

    if (!cart_id) {
        return httpResponse.unauthorized(response, "Invalid session, please relogin!")
    }

    try {
        const cartItems = await cartItemModel.getAllCartItemsByCartId({ cart_id })

        return httpResponse.ok(
            response,
            "Get all cart items success",
            cartItems
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Get cart items failed: " + error.message
        )
    }
}

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function deleteCartItem(request, response) {
    const { id } = request.params
    const { cart_id } = response.locals.userData || {}

    if (!cart_id) {
        return httpResponse.unauthorized(response, "Invalid session, please relogin!")
    }

    if (!id) {
        return httpResponse.badRequest(response, "Cart item id is required")
    }

    try {
        const deletedCartItem = await cartItemModel.deleteCartItem({
            id,
            cart_id
        })

        if (!deletedCartItem) {
            return httpResponse.notFound(response, "Cart item not found")
        }

        return httpResponse.ok(
            response,
            "Delete cart item success",
            deletedCartItem
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Delete cart item failed: " + error.message
        )
    }
}