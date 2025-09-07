import express from 'express'
import multer from 'multer'
import path from 'path'
import User from '../models/user.model.js'

const profileImageRouter = express.Router()

// Configuración de Multer
const storage = multer.diskStorage({
  destination: 'uploads/', // carpeta donde se guardan las fotos
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

// Ruta para subir foto de perfil
profileImageRouter.post('/:id/profile-image', upload.single('profileImage'), async (req, res) => {
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

export default profileImageRouter
