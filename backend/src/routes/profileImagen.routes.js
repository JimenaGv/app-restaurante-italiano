import express from 'express'
import multer from 'multer'
import User from '../models/user.model.js'

const router = express.Router()

// Configuración de Multer para guardar los avatares
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/avatars'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage })

// Ruta para subir avatar
router.post('/avatar/:id', upload.single('avatar'), async (req, res) => {
  try {
    const { id } = req.params
    if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' })

    // Crear URL pública para el avatar
    const avatarUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`

    const user = await User.findByIdAndUpdate(id, { avatar: avatarUrl }, { new: true })
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.json({ message: 'Avatar actualizado', avatar: avatarUrl })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al subir la imagen' })
  }
})

// Ruta para consultar perfil por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const usuario = await User.findById(id)
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' })

    res.json({
      id: usuario._id,
      nombre: usuario.nombre,
      apellidoPaterno: usuario.apellidoPaterno,
      apellidoMaterno: usuario.apellidoMaterno,
      correo: usuario.correo,
      telefono: usuario.telefono,
      avatar: usuario.avatar, // <- CORRECTO
      fechaRegistro: usuario.fechaRegistro,
      activo: usuario.activo,
      direcciones: usuario.direcciones,
      metodosPago: usuario.metodosPago
    })
  } catch (error) {
    console.error('Error al consultar perfil:', error)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
})

export default router
