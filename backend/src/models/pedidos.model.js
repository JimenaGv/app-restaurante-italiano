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
    precio: Number
  }],
  direccion: String,
  metodoPago: String,
  estado: {
    type: String,
    default: 'En preparación'
  },
  fecha: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Pedidos', pedidosSchema)
