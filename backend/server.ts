import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import blogRoutes from './routes/blogs';
import uploadRoutes from "./routes/upload"; 
import questionRoutes from './routes/questionRoutes';

// Cargar variables de entorno 
dotenv.config();

const app = express();

//conexion a MongoDB
connectDB();

//Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // URL de tu frontend Vite
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json());


//Rutas
app.use('/api/auth', authRoutes); //Ruta de autenticacion
app.use('/api', blogRoutes);      //Ruta para los blogs
app.use("/api", uploadRoutes);//Ruta subida de imagenes
app.use('/api/questions', questionRoutes);//Ruta para crear pregunta
console.log('Rutas registradas:', app._router.stack);


// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ 
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });
  
  // Ruta de prueba para verificar que el servidor está funcionando
  app.get('/api/health', (req, res) => {
    res.json({ 
      success: true,
      message: 'API funcionando correctamente',
      timestamp: new Date().toISOString()
    });
  });

//iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
