const User = require("../models/user");

exports.home = (req, res) => {
    res.status(200).json({
        message: "user",
        timestamp: new Date().toISOString
    })
}

exports.register = (req, res) => {
    const user = new User(req.body);

    user.save((error, user) => {
        if (error) res.status(400).json({ error });
        res.json({user});
    });
}