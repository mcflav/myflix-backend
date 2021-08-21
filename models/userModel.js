const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 6
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

function validateUsers(users) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        firstname: Joi.string().min(3).max(255).required(),
        lastname: Joi.string().min(3).max(255).required(),
        birthday: Joi.date().required(),
        gender: Joi.string().min(4).max(6).required(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    };
        return Joi.validate(users, schema);
}

exports.validateUsers = validateUsers;
exports.User = User;