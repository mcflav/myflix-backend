const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

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

const subscriptionSchema = mongoose.Schema({
    planType: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 6
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    planCost: {
        type: Number,
        required: true
    },
    planDiscount: {
        type: Number,
        default: 0
    },
    planDate: {
        type: Date,
        required: true
    },
    planTotal: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

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

function validateSubscription(subscription){
    const schema = {
        planType: Joi.string().min(5).max(6).required(),
        email: Joi.string().min(5).max(255).required().email(),
        planCost: Joi.number().required(),
        planDiscount: Joi.number(),
        planDate: Joi.date().required(),
        planTotal: Joi.number().required()
    };
        return Joi.validate(subscription, schema);
}

exports.validateUsers = validateUsers;
exports.User = User;
exports.validateSubscription = validateSubscription;
exports.Subscription = Subscription;


