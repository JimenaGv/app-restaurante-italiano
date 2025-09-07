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
    ciudad: { type: String, required: true },
    estado: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    pais: { type: String, default: "México" },
  },
  metodoPago: {
    tipo: {
      type: String,
      enum: ["tarjeta", "paypal", "efectivo", "transferencia"],
      required: true,
    },
    numeroTarjeta: {
      type: String,
      required: function () {
        return this.tipo === "tarjeta";
      },
    },
    vencimiento: {
      type: String,
      required: function () {
        return this.tipo === "tarjeta";
      },
    },
    titular: {
      type: String,
      required: function () {
        return this.tipo === "tarjeta";
      },
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
