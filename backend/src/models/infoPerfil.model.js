import mongoose from 'mongoose'

const infoPerfilSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,   // Para que no se repitan
  },
  telefono: {
    type: String,
    required: true,
  },
  profileImage: { // Para guardar la imagen de perfil
    type: String
  }
})

export const User = mongoose.model('infoPerfil', infoPerfilSchema)
