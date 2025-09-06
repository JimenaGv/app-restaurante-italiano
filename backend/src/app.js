import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'

import pedidosRouter from './routes/pedidos.routes.js'
import perfilRouter from './routes/infoPerfil.routes.js'
import menuRouter from './routes/menu.routes.js'
import authRouter from './routes/auth.routes.js'
import profileImageRouter from './routes/profileImagen.routes.js'
import routerDireccionesPago from './routes/direccionesPagos.routes.js'

config()

const PORT = process.env.PORT
const app = express()

// Servir imágenes estáticamente
app.use('/uploads', express.static('uploads'))

// *********************************************************************
app.use(cors(/* {
  origin: "https://app-restaurante-italiano-q16i.vercel.app/"
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
} */))
app.use(express.json())

// Rutas
app.use('/api', authRouter)               // login, registro
app.use('/api/perfil', perfilRouter)      // info básica de perfil
app.use('/api/perfil', profileImageRouter) // foto de perfil
app.use('/api/perfil', routerDireccionesPago) // direcciones y pagos
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
