const mongoose = require('mongoose');
const Joi = require('joi');

const subscriptionSchema = mongoose.Schema({
    planType: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 7
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
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

function validateSubscription(subscription){
    const schema = {
        planType: Joi.string().min(5).max(7).required(),
        email: Joi.string().min(5).max(255).required().email(),
        planCost: Joi.number().required(),
        planDiscount: Joi.number(),
        planDate: Joi.date().required(),
        planTotal: Joi.number().required()
    };
        return Joi.validate(subscription, schema);
}

exports.validateSubscription = validateSubscription;
exports.Subscription = Subscription;


