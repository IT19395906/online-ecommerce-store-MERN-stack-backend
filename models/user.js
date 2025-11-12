const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true });

userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            const saltRounds = 10;
            return bcrypt.hashSync(password + this.salt, saltRounds);
        } catch (error) {
            return '';
        }
    },
}
