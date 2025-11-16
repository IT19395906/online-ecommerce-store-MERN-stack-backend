const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
        maxlength: 900
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);