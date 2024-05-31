import { Router } from "express";
import { uploadPostImageDisk } from "../upload/single-upload-disk";

const router = Router();

router.route('/')
    .get()
    .post(uploadPostImageDisk, (req, res) => {
        res.json({
            message: 'Image uploaded successfully',
            filename: req.body.image
        });
    });

export default router;