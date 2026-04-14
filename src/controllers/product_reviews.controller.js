import * as productReviewsModel from "../models/product_reviews.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getAllProductsReviews(request, response) {
    const productsReviews = await productReviewsModel.getAllProductsReviews()
    response.json({
        success: true,
        message: "Get all products reviews data",
        result: productsReviews
    })
}

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getPopularProducts(request, response) {
    const popularProducts = await productReviewsModel.getPopularProducts()
    response.json({
        success: true,
        message: "Get popular products",
        result: popularProducts
    })
}
