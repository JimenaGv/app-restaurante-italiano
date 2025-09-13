import express from 'express'
import User from '../models/user.model.js'

const router = express.Router()

// Actualizar perfil  (nombre, correo, apellidos y teléfono)
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
