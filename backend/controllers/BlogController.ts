import { Blog } from '../models/Blog';
import { Request, Response } from 'express';

//Crear blog
export const createBlog = async (req: Request, res: Response): Promise<Response> => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        return res.status(201).json(blog);
    } catch (error) {
        return res.status(500).json({message: 'Error al crear el blog', error});
    }
};

//Editar blog
export const updateBlog = async (req: Request, res: Response): Promise<Response> => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!blog) return res.status(404).json({message: 'Blog no encontrado'});
        return res.json(blog);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el blog', error});
    }  
};

//Eliminar blog
export const deleteBlog = async (req: Request, res: Response): Promise<Response> => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if(!blog) return res.status(404).json({ message: 'Blog no encontrado'});
        return res.json({ message: 'Blog eliminado'});
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el blog', error });
    }
};

export const getAllBlogs = async (req: Request, res: Response): Promise<Response> => {
    try {
      const blogs = await Blog.find(); // Suponiendo que tengas un modelo Blog
      return res.status(200).json(blogs);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los blogs' });
    }
  };