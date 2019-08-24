const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        default: "",
        lowercase: true,
        required: "Please enter your email"
    },
    password: {
        type: String,
        default: "",
        required: "Please enter your password"
    },
    organization: {
        type: Date,
        default: Date.now()
    },
    isOnline: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generatePasswordHash = function (string) {
    return bcrypt.hashSync(string, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
