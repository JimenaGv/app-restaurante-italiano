import mongoose from 'mongoose'

const pedidosSchema = new mongoose.Schema({
  usuarioId: {
    /* type: mongoose.Schema.Types.ObjectId, */
    /* ref: 'User', */
    type: String,
    required: true
  },
  platillos: [{
    nombre: String,
    cantidad: Number,
    precio: Number,
    customizations: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  }],
  direccion: String,
  metodoPago: String,
  estado: {
    type: String,
    default: 'Solicitud recibida'
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  tiempoEntrega: {
    type: Number
  }
})

export default mongoose.model('Pedidos', pedidosSchema)
