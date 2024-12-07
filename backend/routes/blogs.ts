import express, { Request, Response, Router } from 'express';
import { Blog } from '../models/Blog';
import * as BlogController from '../controllers/BlogController';

const router: Router = express.Router();

// GET route to fetch all blogs
router.get('/blogs', async (req: Request, res: Response) => {
    try { 
        const blogs = await Blog.find(); 
        res.status(200).json(blogs); 
    } catch (error) { 
        res.status(500).json({ message: 'Error fetching blogs', error }); 
    }
});

//Crear unn blog
router.post('/blogs', (req: Request, res: Response) => {
    BlogController.createBlog(req, res);
});

// Editar un blog
router.put('/blogs/:id', (req: Request, res: Response) => {
    BlogController.updateBlog(req, res);
});

// Eliminar un blog
router.delete('/blogs/:id', (req: Request, res: Response) => {
    BlogController.deleteBlog(req, res);
});

export default router;