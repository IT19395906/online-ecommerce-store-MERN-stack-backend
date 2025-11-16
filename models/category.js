const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        maxlength: [32, 'Name must be less than 32 digits']
    },
    code:{
        type:Number,
        unique:true,
        required: [true, 'Code is required']
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);