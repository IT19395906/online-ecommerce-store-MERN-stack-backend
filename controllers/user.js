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
        if (error.name == 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            res.status(400).json({ errors });
        }
        else if (error.code == 11000) {
            res.status(400).json({
                message: "email already exists",
                error: error.message
            });
        }
        else {
            res.status(400).json({
                message: "user register failed",
                error: error.message
            });
        }
    }
}