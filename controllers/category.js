const Category = require('../models/category');

exports.addCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        const savedCategory = await category.save();
        res.status(200).json({
            message: "category successfully added",
            data: savedCategory
        });
    }
    catch (error) {
        res.status(500).json({
            message: "category adding failed",
            error: error.message
        })
    }
}