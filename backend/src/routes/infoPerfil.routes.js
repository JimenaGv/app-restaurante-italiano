import { Router } from 'express'
import { User } from '../models/infoPerfil.model.js'

const perfilRouter = Router()

//  Obtener perfil por ID
perfilRouter.get('/:id', async (req, res) => {
  try {
    const perfil = await User.findById(req.params.id)
    if (!perfil) {
      return res.status(404).json({ message: 'Perfil no encontrado' })
    }
    res.json(perfil)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil', error })
  }
})

// Actualizar perfil
perfilRouter.put('/:id', async (req, res) => {
  try {
    const perfilActualizado = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new = retorna el actualizado
    )
    if (!perfilActualizado) {
      return res.status(404).json({ message: 'Perfil no encontrado' })
    }
    res.json(perfilActualizado)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el perfil', error })
  }
})

export default perfilRouter
