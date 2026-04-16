import { httpResponse } from "../lib/http_handlers.js"
import * as orderModel from "../models/orders.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function createPayment(request, response) {
    const {
        fullname,
        phone,
        email,
        address,
        delivery
    } = request.body

    const user = response.locals.userData

    const userId = Number(user.id);

    if (!userId || isNaN(userId)) {
        return httpResponse.unauthorized(
            response,
            "Invalid user session"
        );
    }

    if (fullname === undefined || fullname.length < 4) {
        return httpResponse.badRequest(
            response,
            "Checkout failed : Fullname minimum 4 characters"
        )
    }

    if (phone === undefined || phone.length < 10) {
        return httpResponse.badRequest(
            response,
            "Checkout failed : Phone number minimum 10 digits"
        )
    }

    if (email === undefined || !email.includes("@")) {
        return httpResponse.badRequest(
            response,
            "Checkout failed : Invalid email"
        )
    }

    if (address === undefined || address.length < 10) {
        return httpResponse.badRequest(
            response,
            "Checkout failed : Address minimum 10 characters"
        )
    }

    if (delivery === undefined || delivery.length < 4) {
        return httpResponse.badRequest(
            response,
            "Checkout failed : Delivery method required"
        )
    }

    try {
        const order = await orderModel.checkoutOrder(parseInt(userId), {
            fullname,
            phone,
            email,
            address,
            delivery
        })

        if (!order) {
            return httpResponse.serverError(
                response,
                "Checkout transaction failed!"
            )
        }

        return httpResponse.created(
            response,
            "Checkout success!",
            order
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Checkout failed! " + error
        )
    }
}