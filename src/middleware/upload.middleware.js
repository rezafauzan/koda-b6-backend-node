import multer from "multer"
import { nanoid } from "nanoid"
import path from "path"
import fs from "fs"

const storage = (folder) =>
    multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = path.join(process.cwd(), folder)

            fs.mkdirSync(uploadPath, { recursive: true })

            console.log("UPLOAD PATH:", uploadPath)

            cb(null, uploadPath)
        },

        filename: function (req, file, cb) {
            const filename = nanoid()
            const ext = path.extname(file.originalname)

            cb(null, `${filename}${ext}`)
        },
    })

const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/jpg", "image/jpeg", "image/webp"]

    if (!allowed.includes(file.mimetype)) {
        return cb(
            new Error("Only png, jpg, jpeg, webp files are allowed"),
            false
        )
    }

    cb(null, true)
}

export function uploadMiddleware(folder) {
    return multer({
        storage: storage(folder),
        fileFilter,
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
    })
}