// backend/routes/upload.js
import express, { Request, Response, Router } from 'express';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import multer from "multer";



const upload = multer({ storage: multer.memoryStorage() });
const router:Router = express.Router();

interface MulterRequest extends Request { 
    file?: Express.Multer.File; 
}

router.post("/upload-image", upload.single("image"), async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: 'No file uploaded' });
            return; 
        }
        const storageRef = ref(storage, `images/${file.originalname}`);
        const snapshot = await uploadBytes(storageRef, file.buffer);
        const downloadURL = await getDownloadURL(snapshot.ref);
        res.status(200).json({ imageUrl: downloadURL });
    } catch (error) {
        res.status(500).json({ error: "Error al subir la imagen" });
    }
});

export default router;
