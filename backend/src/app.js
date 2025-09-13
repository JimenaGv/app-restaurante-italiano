import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import path from 'path'

import pedidosRouter from './routes/pedidos.routes.js'
import perfilRouter from './routes/infoPerfil.routes.js'
import menuRouter from './routes/menu.routes.js'
import authRouter from './routes/auth.routes.js'
import profileRoutes from './routes/profileImagen.routes.js'
import routerDireccionesPago from './routes/direccionesPagos.routes.js'

config()

const PORT = process.env.PORT
const app = express()

// *********************************************************************
app.use(cors(/* {
  origin: "https://app-restaurante-italiano-q16i.vercel.app/"
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
} */))
app.use(express.json())

// Rutas
app.use('/api', authRouter)               // login, registro
app.use('/perfil', perfilRouter)          // info básica de perfil
app.use('/perfil', profileRoutes) // foto de perfil
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'))) // Para servir las imágenes
app.use('/direccionesPago', routerDireccionesPago) // direcciones y pagos
app.use('/pedidos', pedidosRouter)        // pedidos
app.use('/menu', menuRouter)              // menú

// Ruta de prueba
app.get('/api/hola', (req, res) => {
  res.json({ mensaje: '¡Hola desde el backend!' })
})
mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => console.log('Conectado a MongoDB'))

// Iniciar servidor
app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto', PORT)
})
