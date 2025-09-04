import { Router } from 'express'
import MenuCategory from '../models/menu.model.js'

const menuRouter = Router()

menuRouter.get('/', async (req, res) => {
  try {
    const menuCompleto = await MenuCategory.find().sort({ text: 1 })
    res.json(menuCompleto)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

menuRouter.post('/', async (req, res) => {
  const { text, value, dish } = req.body

  try {
    let menuCategory = await MenuCategory.findOne({ value })

    if (!menuCategory) {
      menuCategory = new MenuCategory({ text, value, dishes: [] })
    }

    menuCategory.dishes.push(dish)

    await menuCategory.save()

    res.status(201).json({ message: 'Platillo agregado exitosamente', menuCategory })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

menuRouter.delete('/', async (req, res) => {
  try {
    const result = await MenuCategory.deleteMany({})

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No se encontraron registros para eliminar.' })
    }

    res.status(200).json({ message: 'Todos los registros de menú fueron eliminados correctamente.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default menuRouter
