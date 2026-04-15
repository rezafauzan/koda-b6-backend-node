import * as productModel from "../models/products.model.js"

export async function createProduct(request, response) {
    try {
        const { category_id, name, description, price, stock } = request.body

        if (!category_id) {
            return response.json({
                success: false,
                message: "category_id is required",
                result: null
            })
        }

        if (!name) {
            return response.json({
                success: false,
                message: "name is required",
                result: null
            })
        }

        if (name.length < 4) {
            return response.json({
                success: false,
                message: "name must be at least 4 characters",
                result: null
            })
        }

        if (!description) {
            return response.json({
                success: false,
                message: "description is required",
                result: null
            })
        }

        if (!price && price !== 0) {
            return response.json({
                success: false,
                message: "price is required",
                result: null
            })
        }

        if (Number(price) <= 0) {
            return response.json({
                success: false,
                message: "price must be greater than 0",
                result: null
            })
        }

        if (!stock && stock !== 0) {
            return response.json({
                success: false,
                message: "stock is required",
                result: null
            })
        }

        if (Number(stock) <= 0) {
            return response.json({
                success: false,
                message: "stock must be greater than 0",
                result: null
            })
        }

        const result = await productModel.createProduct({
            category_id: Number(category_id),
            name,
            description,
            price: parseFloat(price),
            stock: Number(stock)
        })

        return response.json({
            success: true,
            message: "Create product success",
            result
        })
    } catch (error) {
        console.error(error)

        return response.json({
            success: false,
            message: "Internal server error",
            result: null
        })
    }
}

export async function getProducts(request, response) {
    try {
        const { name } = request.query

        let result

        if (name) {
            result = await productModel.getProductsByName({ name })
        } else {
            result = await productModel.getAllProducts()
        }

        return response.json({
            success: true,
            message: "Get products success",
            result
        })
    } catch (error) {
        console.error(error)

        return response.json({
            success: false,
            message: "Internal server error",
            result: null
        })
    }
}

export async function getProductsByCategoryId(request, response) {
    try {
        const { category_id } = request.params

        const result = await productModel.getProductsByCategoryId({
            category_id: Number(category_id)
        })

        return response.json({
            success: true,
            message: "Get products by category success",
            result
        })
    } catch (error) {
        console.error(error)

        return response.json({
            success: false,
            message: "Internal server error",
            result: null
        })
    }
}

export async function updateProduct(request, response) {
    try {
        const { id } = request.params
        const { category_id, name, description, price, stock } = request.body

        const result = await productModel.updateProduct({
            id: Number(id),
            category_id: Number(category_id),
            name,
            description,
            price: parseFloat(price),
            stock: Number(stock)
        })

        return response.json({
            success: true,
            message: "Update product success",
            result
        })
    } catch (error) {
        console.error(error)

        return response.json({
            success: false,
            message: "Internal server error",
            result: null
        })
    }
}

export async function deleteProduct(request, response) {
    try {
        const { id } = request.params

        const result = await productModel.deleteProduct({
            id: Number(id)
        })

        return response.json({
            success: true,
            message: "Delete product success",
            result
        })
    } catch (error) {
        console.error(error)

        return response.json({
            success: false,
            message: "Internal server error",
            result: null
        })
    }
}