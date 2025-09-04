import mongoose from 'mongoose'

const CustomizationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  value: { type: String, required: true },
  options: [{ type: String, required: true }]
}, { _id: false })

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  customizations: [CustomizationSchema]
}, { _id: true })

const MenuCategorySchema = new mongoose.Schema({
  text: { type: String, required: true },
  value: { type: String, required: true, unique: true },
  dishes: [DishSchema]
})

export default mongoose.model('MenuCategory', MenuCategorySchema)
