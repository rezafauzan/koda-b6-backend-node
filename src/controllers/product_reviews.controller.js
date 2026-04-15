import * as productReviewsModel from "../models/product_reviews.model.js"
import { httpResponse } from "../lib/http_handlers.js"

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getAllProductsReviews(request, response) {
    try {
        const productsReviews = await productReviewsModel.getAllProductsReviews()

        return httpResponse.ok(
            response,
            "Get all products reviews data",
            productsReviews
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Failed to get all product reviews: " + error.message
        )
    }
}

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getLatestReviews(request, response) {
    try {
        const productsReviews = await productReviewsModel.getLatestReviews()

        return httpResponse.ok(
            response,
            "Get latest products reviews data",
            productsReviews
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Failed to get latest reviews: " + error.message
        )
    }
}

/**
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getPopularProducts(request, response) {
    try {
        const popularProducts = await productReviewsModel.getPopularProducts()

        return httpResponse.ok(
            response,
            "Get popular products",
            popularProducts
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Failed to get popular products: " + error.message
        )
    }
}