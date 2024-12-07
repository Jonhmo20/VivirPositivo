import express, { Request, Response, Router} from 'express'
import { login } from '../controllers/authController';
import User from '../models/User';

const router: Router = express.Router();


router.post('/login', login);

// Para el endpoint /users
router.get('/users', async (req: Request, res: Response)  => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error});
    }
});

export default router;