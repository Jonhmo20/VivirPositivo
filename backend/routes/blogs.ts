import express, { Request, Response, Router } from 'express';
import { Blog } from '../models/Blog';
import * as BlogController from '../controllers/BlogController';

const router: Router = express.Router();

// Obtener todos los blogs
router.get('/blogs', async (req: Request, res: Response) => {
    try { 
        const blogs = await Blog.find(); 
        res.status(200).json(blogs); 
    } catch (error) { 
        res.status(500).json({ message: 'Error fetching blogs', error }); 
    }
});

// Obtener un blog específico
/*router.get('/blogs/:id', async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog no encontrado' });
            }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el blog', error });
    }
});*/

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