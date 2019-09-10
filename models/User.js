const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const emailRegex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "Please enter your first name.",
        trim: true
    },
    lastName: {
        type: String,
        required: "Please enter your last name.",
        trim: true
    },
    email: {
        type: String,
        default: "",
        lowercase: true,
        required: "Please enter your email",
        validate: {
            validator: function (e) {
                return emailRegex.test(e);
            },
            message: "The email entered is invalid."
        }
    },
    password: {
        type: String,
        minlength: [8, "Password must be at least 8 characters"],
        required: "Please enter your password"
    },
    organization: {
        type: String,
        default: ""
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    isAdmin: {
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
