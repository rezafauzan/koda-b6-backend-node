import * as cartItemModel from "../models/cart_items.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function createCartItem(request, response) {
    const { cart_id, product_id, size_id, variant_id, quantity } = request.body

    if (cart_id === undefined) {
        response.json({
            success: false,
            message: "Invalid sessions please relogin!",
            result: null
        })
        return
    }

    if (product_id === undefined) {
        response.json({
            success: false,
            message: "Add to cart failed product invalid",
            result: null
        })
        return
    }

    if (size_id === undefined) {
        response.json({
            success: false,
            message: "Add to cart failed product portion invalid",
            result: null
        })
        return
    }

    if (variant_id === undefined) {
        response.json({
            success: false,
            message: "Add to cart failed product variant invalid",
            result: null
        })
        return
    }

    if (quantity === undefined || quantity < 1) {
        response.json({
            success: false,
            message: "Add to cart failed quantity minimum 1",
            result: null
        })
        return
    }

    try {
        const createdCartItem = await cartItemModel.createCartItem({ cart_id, product_id, size_id, variant_id, quantity })

        if (!createdCartItem) {
            throw new Error("Add to cart fail!")
        }

        response.json({
            success: true,
            message: "Add to cart success !",
            result: createdCartItem
        })
    } catch (error) {
        response.json({
            success: false,
            message: error,
            result: null
        })
    }
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getAllCartItemsByCartId(request, response) {
    const { cart_id } = request.params

    if (cart_id === undefined) {
        response.json({
            success: false,
            message: "Invalid sessions please relogin!",
            result: null
        })
        return
    }

    try {
        const cartItems = await cartItemModel.getAllCartItemsByCartId({ cart_id })

        response.json({
            success: true,
            message: "Get all cart items success",
            result: cartItems
        })
    } catch (error) {
        response.json({
            success: false,
            message: "Get cart items fail ! " + error,
            result: null
        })
    }
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function deleteCartItem(request, response) {
    const { id } = request.params

    if (id === undefined) {
        response.json({
            success: false,
            message: "Delete cart item failed invalid cart_items",
            result: null
        })
        return
    }

    try {
        const deletedCartItem = await cartItemModel.deleteCartItem({ id })

        if (!deletedCartItem) {
            response.json({
                success: false,
                message: "Delete cart item failed : item not found",
                result: null
            })
            return
        }

        response.json({
            success: true,
            message: "Delete cart item success !",
            result: deletedCartItem
        })
    } catch (error) {
        response.json({
            success: false,
            message: "Delete cart item fail ! " + error,
            result: null
        })
    }
}