const express = require('express');
const router = express.Router();
const { Subscription, validateSubscription } = require('../models/subscriptionModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const mongoose = require('mongoose');
const validateObjectId = require('../middleware/validateObjectId');

router.post('/getSubscription', auth, async (req,res) => {
    
    const subEmail = await Subscription.find();
    const userEmail = req.body.email;
    let subscriptionFound = false;

    for (i = 0; i < subEmail.length; i++){
        if(subEmail[i].email == userEmail){
            subscriptionFound = true;
        }
    }

    if(subscriptionFound === false){
        return res.status(404).send('A subscription could not be found for this user.');
    } else {
        const subscription = await Subscription.find({email: userEmail});
        res.send(subscription);
    }
})

router.get('/', auth, async (req,res) => {
    let users = await Subscription.find().sort('planType');
    res.send(users);
});

router.get('/:id', [auth, validateObjectId], async (res,req) => {
    const user = await Subscription.findById(req.params.id);
    res.send(user);
});

router.post('/', async (req,res) => {
    const { error } = validateSubscription(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let subscription = new Subscription({planType: req.body.planType, email: req.body.email, planCost: req.body.planCost,
        planDiscount: req.body.planDiscount, planDate: req.body.planDate, planTotal: req.body.planTotal});
    
    subscription = await subscription.save();
    res.status(200).send(subscription);
});

router.put('/:id', [auth, validateObjectId], async (req,res) => {
    const {error} = validateSubscription(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body);
    res.send(subscription);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req,res) => {
    const subscription = await Subscription.findByIdAndRemove(req.params.id);
    res.send(subscription);
});

module.exports = router;
