import multer from "multer"
import { nanoid } from "nanoid"
import path from "path"
import fs from "fs"

const storage = (folder) =>
    multer.diskStorage({
        destination: function (req, file, cb) {
            fs.mkdirSync(folder, { recursive: true })
            cb(null, folder)
        },
        filename: function (req, file, cb) {
            const randStr = nanoid()
            const ext = path.extname(file.originalname)
            cb(null, `${randStr}${ext}`)
        },
    })

const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/jpg"]

    if (!allowed.includes(file.mimetype)) {
        return cb(new Error("Only image files are allowed"), false)
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