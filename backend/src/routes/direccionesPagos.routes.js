import express from 'express'
import User from '../models/user.model.js'

const routerDireccionesPago = express.Router()

// Obtener direcciones y métodos de pago
routerDireccionesPago.get('/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.json({
      direcciones: usuario.direcciones || [],
      metodosPago: usuario.metodosPago || []
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})


//  Agregar una dirección
routerDireccionesPago.post('/:id/direcciones', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    usuario.direcciones.push(req.body)
    await usuario.save()

    res.json(usuario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

//  Eliminar dirección

routerDireccionesPago.delete('/:id/direcciones/:index', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    usuario.direcciones.splice(req.params.index, 1)
    await usuario.save()

    res.json(usuario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

//  Agregar método de pago
routerDireccionesPago.post('/:id/metodos-pago', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    usuario.metodosPago.push(req.body)
    await usuario.save()

    res.json(usuario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

//  Eliminar método de pago
routerDireccionesPago.delete('/:id/metodos-pago/:index', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    usuario.metodosPago.splice(req.params.index, 1)
    await usuario.save()

    res.json(usuario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default routerDireccionesPago
