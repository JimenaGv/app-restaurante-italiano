import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { config } from 'dotenv'
import { User } from './models/infoPerfil.model.js'
import pedidosRouter from './routes/pedidos.routes.js'
import perfilRouter from './routes/infoPerfil.routes.js'

import menuRouter from './routes/menu.routes.js'
import authRouter from './routes/auth.routes.js'

config()

const PORT = process.env.PORT
const app = express()

// Configuracion de Multer par Subir imagen de perfil
const storage = multer.diskStorage({
  destination: 'uploads/', // carpeta donde se guardan las fotos
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

// Ruta para subir foto de perfil
app.post('/api/users/:id/profile-image', upload.single('profileImage'), async (req, res) => {
  try {
    const userId = req.params.id
    const imageUrl = `/uploads/${req.file.filename}`

    // Guardamos en MongoDB
    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true }
    )

    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Servir imágenes estáticamente
app.use('/uploads', express.static('uploads'))

// *********************************************************************
app.use(cors(/* {
  origin: "https://app-restaurante-italiano-q16i.vercel.app/"
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
} */))
app.use(express.json())

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

app.use('/api/perfil', perfilRouter)
app.use('/pedidos', pedidosRouter)
app.use('/menu', menuRouter)
app.use('/api', authRouter)
app.use('/api/perfil', perfilRouter)
app.use('/pedidos', pedidosRouter)
