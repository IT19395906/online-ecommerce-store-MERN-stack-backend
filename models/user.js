const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        maxlength: [32, 'Name must be less than 32 digits']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Email is not valid']
    },
    hashed_password: {
        type: String,
        required: [true, 'Password is required']
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
        if(!password || password < 8) {
            throw new Error("Password must be at least 8 digits");
        }
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

    authenticate: function(password) {
        if(!password) return '';
        return this.encryptPassword(password) === this.hashed_password;
    }
}


module.exports = mongoose.model("User", userSchema);
