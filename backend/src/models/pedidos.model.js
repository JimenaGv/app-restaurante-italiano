import mongoose from "mongoose";

const pedidosSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  platillos: [{
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true, min: 1 },
    precio: { type: Number, required: true, min: 0 },
    customizations: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  }],
  direccion: {
    calle: { type: String, required: true },
    numeroInterior: { type: String, required: true },
    numeroEXterior: { type: Number, required: true },
    colonia: { type: String, required: true },
    alcadia: { type: String, required: true },
    codigoPostal: { type: String, required: true },
  },
  metodoPago: {
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
  }},
  estado: {
    type: String,
    default: "Solicitud recibida",
    enum: ['Solicitud recibida', 'En preparación', 'Listo para ser enviado', 'Enviado', 'Entregado'],
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  tiempoEntrega: {
    type: Number,
  },
});

export default mongoose.model("Pedidos", pedidosSchema);
