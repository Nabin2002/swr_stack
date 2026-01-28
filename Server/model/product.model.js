import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const ProductModel = model("Product", productSchema)
export default ProductModel