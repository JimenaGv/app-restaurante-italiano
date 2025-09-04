import { Router } from 'express'
import Pedidos from '../models/pedidos.model.js'

const pedidosRouter = Router()

// Enviar pedido
pedidosRouter.post('/', async (req, res) => {
  try {
    const nuevoPedido = new Pedidos(req.body)
    await nuevoPedido.save()
    res.status(201).json(nuevoPedido)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Obtener pedidos
pedidosRouter.get('/:usuarioId', async (req, res) => {
  try {
    const { usuarioId } = req.params
    const listaPedidos = await Pedidos.find({ usuarioId }).sort({ fecha: -1 })
    if (listaPedidos.length === 0) {
      return res.status(404).json({ message: 'El usuario no tiene pedidos registrados.' })
    }
    res.json(listaPedidos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Actualizar estado del pedido
pedidosRouter.patch('/:id/estado', async (req, res) => {
  try {
    const { id } = req.params
    const { estado } = req.body
    const actualizado = await Pedidos.findByIdAndUpdate(id, { estado }, { new: true })
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


export default pedidosRouter
