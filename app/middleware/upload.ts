import multer from "multer";

const storage = multer.diskStorage({
    destination: "upload",
    filename: (req, file, cb) => {
        const suffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + suffix)
    }
});

export const upload = multer({storage});