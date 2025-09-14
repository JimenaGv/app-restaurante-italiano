import express from 'express'
import User from '../models/user.model.js'

const router = express.Router()

// Obtener perfil del usuario
router.get('/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.json(usuario)
  } catch (error) {
    console.error('Error al obtener perfil:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// Actualizar perfil (nombre, correo, apellidos y teléfono)
router.put('/:id', async (req, res) => {
  try {
    const { nombre, correo, apellidoPaterno, apellidoMaterno, telefono } = req.body
    const { id } = req.params

    const usuarioActualizado = await User.findByIdAndUpdate(
      id,
      { nombre, correo, apellidoPaterno, apellidoMaterno, telefono },
      { new: true }
    )

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }

    res.json({
      mensaje: 'Perfil actualizado correctamente',
      usuario: usuarioActualizado
    })
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
})

export default router
