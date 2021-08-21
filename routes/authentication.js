const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../models/userModel');
const Joi = require('joi');
const router = express.Router();
const config = require('config');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

router.post('/', async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(401).send({auth: false, token: null});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(401).send({auth: false, token: null});

    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'), {
        expiresIn: 86400
    });

    res.status(200).send({ auth:true, token: token });

    function validate(req){
        const schema = {
            email: Joi.string().min(5).max(255).required(),
            password: Joi.string().min(5).max(255).required()
        };
            return Joi.validate(req,schema);
    }
});

module.exports = router;