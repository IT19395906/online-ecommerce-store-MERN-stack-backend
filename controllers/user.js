const User = require("../models/user");

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json({
            message: "user registered successfully",
            user: savedUser
        });
    } catch (error) {
        res.status(400).json({
            message: "user register failed",
            error: error.message
        });
    }
}