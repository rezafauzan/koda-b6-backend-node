import { verifyToken } from "../lib/jwt.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 */
export default function authMiddleware(request, response, next) {
    const authHeader = request.headers.authorization
    const prefix = "Bearer "
    const isBearer = authHeader?.startsWith(prefix)
    if (isBearer) {
        const token = authHeader.slice(prefix.length)
        const payload = verifyToken(token)
        if (payload) {
            response.locals.userData = payload
            next()
            return
        }
    }
    response.status(400).json({
        success: false,
        messages: "Unauthorized access!",
        result: null
    })
}