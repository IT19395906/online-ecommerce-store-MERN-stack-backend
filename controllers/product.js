const formidable = require('formidable');
const fs = require('fs');
const Product = require('../models/product');

exports.addProduct = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.maxFileSize = 5 * 1024 * 1024;

        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve({ fields, files });
            });
        });

        const product = new Product(fields);

        if (files.photo) {

            if (files.photo.size > form.maxFileSize) {
                return res.status(400).json({
                    message:"Image size must be less than 5mb"
                });
             }
             
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        const savedProduct = await product.save();
        res.status(200).json({
            message: "product added successfully",
            data: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "product adding failed",
            error: error.message
        });
    }
};
