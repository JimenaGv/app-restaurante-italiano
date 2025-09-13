import mongoose from 'mongoose'

// Subesquema para Direcciones
const direccionSchema = new mongoose.Schema({
  calle: { type: String, required: true },
  numeroInterior: { type: Number, required: true },
  numeroEXterior: { type: Number, required: true },
  colonia: { type: String, required: true },
  alcadia: { type: String, required: true },
  codigoPostal: { type: String, required: true },

}, { _id: false })

// Subesquema para Métodos de Pago
const metodoPagoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['tarjeta'],
    required: true,
    default: 'tarjeta'
  },
  categoria: {
    type: String,
    enum: ['crédito', 'débito'],
    required: true
  },
  numeroTarjeta: {
    type: String,
    required: true
  },
  vencimiento: {
    type: String,
    required: true
  },
  titular: {
    type: String,
    required: true
  }
}, { _id: false })

// Esquema principal para Usuario
const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre no puede tener más de 50 caracteres']
  },
  apellidoPaterno: {
    type: String,
    trim: true,
    maxlength: [50, 'El apellido paterno no puede tener más de 50 caracteres']
  },
  apellidoMaterno: {
    type: String,
    trim: true,
    maxlength: [50, 'El apellido materno no puede tener más de 50 caracteres']
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor ingresa un correo válido'
    ]
  },
  contraseña: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  telefono: {
    type: String,
    trim: true,
    match: [/^[0-9+\s()-]{7,20}$/, 'Por favor ingresa un número válido']
  },
  direcciones: [direccionSchema],
  metodosPago: [metodoPagoSchema],
  avatar: { type: String, default: '/fotoUsuario.png' },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Ocultar contraseña al devolver el objeto
userSchema.methods.toJSON = function () {
  const usuario = this.toObject()
  delete usuario.contraseña
  return usuario
}

const User = mongoose.model('User', userSchema)

export default User
