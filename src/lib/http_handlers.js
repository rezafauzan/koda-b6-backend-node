export const httpResponse = {
    ok: (response, message = "OK", result = null) => {
        return response.status(200).json({
            success: true,
            message,
            result
        })
    },

    created: (response, message = "Created", result = null) => {
        return response.status(201).json({
            success: true,
            message,
            result
        })
    },

    badRequest: (response, message = "Bad Request", result = null) => {
        return response.status(400).json({
            success: false,
            message,
            result
        })
    },

    unauthorized: (response, message = "Unauthorized") => {
        return response.status(401).json({
            success: false,
            message,
            result: null
        })
    },

    forbidden: (response, message = "Forbidden") => {
        return response.status(403).json({
            success: false,
            message,
            result: null
        })
    },

    notFound: (response, message = "Not Found") => {
        return response.status(404).json({
            success: false,
            message,
            result: null
        })
    },

    serverError: (response, message = "Internal Server Error") => {
        return response.status(500).json({
            success: false,
            message,
            result: null
        })
    }
}