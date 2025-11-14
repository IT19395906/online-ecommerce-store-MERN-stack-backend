const User = require("../models/user");
const jwt = require('jsonwebtoken');

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

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) { return res.status(400).json({ message: "user with this email not found" }); }

        const valid = user.authenticate(password);
        if (!valid) {
            return res.status(401).json({ message: "email and password not match" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 3600000 });
        res.status(200).json({
            message: "successfully logged in",
            token: token,
            user: { _id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(400).json({
            message: "login failed"
        });
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "successfully logout" });
    }
    catch (error) {
        res.status(500).json({ message: "logout failed" });
    }
}