export default function rbac(...allowedRoles) {
    return (request, response, next) => {
        try {
            const user = response.locals.userData

            if (!user) {
                return response.json({
                    success: false,
                    message: "Unauthorized",
                    result: null
                })
            }

            if (!allowedRoles.includes(user.role_name.toLowerCase())) {
                return response.json({
                    success: false,
                    message: "Forbidden: Access denied",
                    result: null
                })
            }

            next()
        } catch (error) {
            return response.json({
                success: false,
                message: "Role Based Access middleware error",
                result: null
            })
        }
    }
}