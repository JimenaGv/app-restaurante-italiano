import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import pedidosRouter from './routes/pedidos.routes.js';
import perfilRouter from "./routes/infoPerfil.routes.js";

config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/hola', (req, res) => {
  res.json({ mensaje: '¡Hola desde el backend!' });
});
mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => console.log('Conectado a MongoDB'));

app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto', PORT);
});

app.use("/api/perfil", perfilRouter);
app.use('/pedidos', pedidosRouter);
