// src/services/blogService.ts
import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export interface BlogPost {
    id: number;
    title: string;
    description?: string;
    author?: string;
    videoUrl?: string;
    image?: string;
    type: "text" | "video";
}

export const blogService = {
    // Obtener todos los blogs
    getAll: async () => {
        const response = await axios.get(`${API_URL}/blogs`);
        return response.data;
    },

    // Obtener un blog específico
    getById: async (id: string) => {
        const response = await axios.get(`${API_URL}/blogs/${id}`);
        return response.data;
    },

    // Crear un nuevo blog
    create: async (blog: Omit<BlogPost, 'id'>) => {
        const response = await axios.post(`${API_URL}/blogs`, blog);
        return response.data;
    },

    // Actualizar un blog existente
    update: async (id: string, blog: Partial<BlogPost>) => {
        const response = await axios.put(`${API_URL}/blogs/${id}`, blog);
        return response.data;
    },

    // Eliminar un blog
    delete: async (id: string) => {
        const response = await axios.delete(`${API_URL}/blogs/${id}`);
        return response.data;
    }
};