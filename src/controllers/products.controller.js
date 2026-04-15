import * as productModel from "../models/products.model.js"
import { httpResponse } from "../lib/http_handlers.js"

export async function createProduct(request, response) {
    const { category_id, name, description, price, stock } = request.body

    if (!category_id) {
        return httpResponse.badRequest(response, "category_id is required")
    }

    if (!name) {
        return httpResponse.badRequest(response, "name is required")
    }

    if (name.length < 4) {
        return httpResponse.badRequest(response, "name must be at least 4 characters")
    }

    if (!description) {
        return httpResponse.badRequest(response, "description is required")
    }

    if (price === undefined || price === null) {
        return httpResponse.badRequest(response, "price is required")
    }

    if (Number(price) <= 0) {
        return httpResponse.badRequest(response, "price must be greater than 0")
    }

    if (stock === undefined || stock === null) {
        return httpResponse.badRequest(response, "stock is required")
    }

    if (Number(stock) <= 0) {
        return httpResponse.badRequest(response, "stock must be greater than 0")
    }

    try {
        const result = await productModel.createProduct({
            category_id: Number(category_id),
            name,
            description,
            price: Number(price),
            stock: Number(stock)
        })

        return httpResponse.created(
            response,
            "Create product success",
            result
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Create product failed: " + error.message
        )
    }
}

export async function getProducts(request, response) {
    const { name } = request.query

    try {
        const result = name
            ? await productModel.getProductsByName({ name })
            : await productModel.getAllProducts()

        return httpResponse.ok(
            response,
            "Get products success",
            result
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Get products failed: " + error.message
        )
    }
}

export async function getProductsByCategoryId(request, response) {
    const { category_id } = request.params

    if (!category_id) {
        return httpResponse.badRequest(response, "category_id is required")
    }

    try {
        const result = await productModel.getProductsByCategoryId({
            category_id: Number(category_id)
        })

        return httpResponse.ok(
            response,
            "Get products by category success",
            result
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Get products by category failed: " + error.message
        )
    }
}

export async function updateProduct(request, response) {
    const { id } = request.params
    const { category_id, name, description, price, stock } = request.body

    if (!id) {
        return httpResponse.badRequest(response, "id is required")
    }

    try {
        const result = await productModel.updateProduct({
            id: Number(id),
            category_id: category_id ? Number(category_id) : undefined,
            name,
            description,
            price: price !== undefined ? Number(price) : undefined,
            stock: stock !== undefined ? Number(stock) : undefined
        })

        if (!result) {
            return httpResponse.notFound(response, "Product not found")
        }

        return httpResponse.ok(
            response,
            "Update product success",
            result
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Update product failed: " + error.message
        )
    }
}

export async function deleteProduct(request, response) {
    const { id } = request.params

    if (!id) {
        return httpResponse.badRequest(response, "id is required")
    }

    try {
        const result = await productModel.deleteProduct({
            id: Number(id)
        })

        if (!result) {
            return httpResponse.notFound(response, "Product not found")
        }

        return httpResponse.ok(
            response,
            "Delete product success",
            result
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Delete product failed: " + error.message
        )
    }
}