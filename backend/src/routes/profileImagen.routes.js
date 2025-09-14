import express from 'express'
import multer from 'multer'
import streamifier from 'streamifier'
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import User from '../models/user.model.js'

dotenv.config()
const router = express.Router()

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Usamos multer en modo memoria (no guarda en disco)
const upload = multer({ storage: multer.memoryStorage() })

// Ruta para subir avatar a Cloudinary
router.post('/avatar/:id', upload.single('avatar'), async (req, res) => {
  try {
    const { id } = req.params
    if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' })

    // Subir imagen a Cloudinary desde el buffer
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'avatars',
            transformation: [
              { width: 300, height: 300, crop: 'fill', gravity: 'face', radius: 'max' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (result) resolve(result)
            else reject(error)
          }
        )
        streamifier.createReadStream(req.file.buffer).pipe(stream)
      })
    }

    const result = await streamUpload()
    const user = await User.findByIdAndUpdate(id, { avatar: result.secure_url }, { new: true })

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.json({ message: 'Avatar actualizado correctamente', avatar: result.secure_url })
  } catch (err) {
    console.error('Error al subir imagen:', err)
    res.status(500).json({ error: 'Error al subir la imagen' })
  }
})

export default router
