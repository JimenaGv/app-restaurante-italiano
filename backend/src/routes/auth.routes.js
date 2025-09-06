import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body

    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      })
    }

    if (contraseña.length < 6) {
      return res.status(400).json({
        mensaje: 'La contraseña debe tener al menos 6 caracteres'
      })
    }

    const usuarioExistente = await User.findOne({ correo: correo.toLowerCase() })
    if (usuarioExistente) {
      return res.status(400).json({
        mensaje: 'Ya existe un usuario con ese correo electrónico'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const contraseñaEncriptada = await bcrypt.hash(contraseña, salt)

    const nuevoUsuario = new User({
      nombre: nombre.trim(),
      correo: correo.toLowerCase().trim(),
      contraseña: contraseñaEncriptada
    })

    await nuevoUsuario.save()

    const token = jwt.sign(
      {
        id: nuevoUsuario._id,
        correo: nuevoUsuario.correo
      },
      process.env.JWT_SECRET || 'bella-italia-secret-key',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      token,
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        fechaRegistro: nuevoUsuario.fechaRegistro
      }
    })
  } catch (error) {
    console.error('Error en registro:', error)

    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        mensaje: errores[0]
      })
    }

    if (error.code === 11000) {
      return res.status(400).json({
        mensaje: 'Ya existe un usuario con ese correo electrónico'
      })
    }

    res.status(500).json({
      mensaje: 'Error interno del servidor'
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body

    if (!correo || !contraseña) {
      return res.status(400).json({
        mensaje: 'Correo y contraseña son obligatorios'
      })
    }

    const usuario = await User.findOne({ correo: correo.toLowerCase().trim() })
    if (!usuario) {
      return res.status(400).json({
        mensaje: 'Credenciales inválidas'
      })
    }
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña)
    if (!contraseñaValida) {
      return res.status(400).json({
        mensaje: 'Credenciales inválidas'
      })
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        correo: usuario.correo
      },
      process.env.JWT_SECRET || 'bella-italia-secret-key',
      { expiresIn: '7d' }
    )

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        fechaRegistro: usuario.fechaRegistro
      }
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({
      mensaje: 'Error interno del servidor'
    })
  }
})

export default router
