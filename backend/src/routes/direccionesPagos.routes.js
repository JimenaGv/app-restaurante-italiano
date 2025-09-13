import express from 'express'
import User from '../models/user.model.js'

const routerDireccionesPago = express.Router()

/* OBTENER DIRECCIONES Y MÉTODOS DE PAGO */
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

/* AGREGAR UNA DIRECCIÓN */
routerDireccionesPago.post('/:id/direcciones', async (req, res) => {
  try {
    const { calle, ciudad, estado, codigoPostal, pais } = req.body
    if (!calle || !ciudad || !estado || !codigoPostal) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben estar completos' })
    }

    const usuario = await User.findById(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    usuario.direcciones.push({ calle, ciudad, estado, codigoPostal, pais })
    await usuario.save()

    res.json({ direcciones: usuario.direcciones })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/* ELIMINAR UNA DIRECCI */
routerDireccionesPago.delete('/:id/direcciones/:index', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    const idx = parseInt(req.params.index, 10)
    if (idx < 0 || idx >= usuario.direcciones.length) {
      return res.status(400).json({ error: 'Índice de dirección inválido' })
    }

    usuario.direcciones.splice(idx, 1)
    await usuario.save()

    res.json({ direcciones: usuario.direcciones })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/* AGREGAR UN MÉTODO DE PAGO */

routerDireccionesPago.post('/:id/metodos-pago', async (req, res) => {
  try {
    const { numeroTarjeta, vencimiento, titular, categoria } = req.body
    // categoria = "crédito" | "débito"

    // Validar campos obligatorios
    if (!numeroTarjeta || !vencimiento || !titular || !categoria) {
      return res.status(400).json({ error: 'Todos los campos de la tarjeta son obligatorios (incluyendo si es crédito o débito)' })
    }

    // Validar tipo de tarjeta
    const categoriasValidas = ['crédito', 'débito']
    if (!categoriasValidas.includes(categoria.toLowerCase())) {
      return res.status(400).json({ error: 'La categoría debe ser crédito o débito' })
    }

    // Validar número de tarjeta (16 dígitos)
    if (!/^\d{16}$/.test(numeroTarjeta)) {
      return res.status(400).json({ error: 'El número de tarjeta debe tener 16 dígitos' })
    }

    // Validar vencimiento (MM/AA)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento)) {
      return res.status(400).json({ error: 'El vencimiento debe estar en formato MM/AA' })
    }

    const usuario = await User.findById(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    // Guardar método de pago
    usuario.metodosPago.push({
      tipo: 'tarjeta',
      categoria: categoria.toLowerCase(), // "crédito" o "débito"
      numeroTarjeta,
      vencimiento,
      titular
    })

    await usuario.save()

    res.json({ metodosPago: usuario.metodosPago })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

/* ELIMINAR UN MÉTODO DE PAGO */
routerDireccionesPago.delete('/:id/metodos-pago/:index', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    const idx = parseInt(req.params.index, 10)
    if (idx < 0 || idx >= usuario.metodosPago.length) {
      return res.status(400).json({ error: 'Índice de método de pago inválido' })
    }

    usuario.metodosPago.splice(idx, 1)
    await usuario.save()

    res.json({ metodosPago: usuario.metodosPago })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default routerDireccionesPago
