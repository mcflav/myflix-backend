//Added CORS routes..
const express = require('express');
const cors = require('cors');

const users = require('../routes/usersRoutes');
const subscription = require('../routes/subscriptionRoutes');
const authentication = require('../routes/authentication');

module.exports = function(app){
    app.use(express.json());
    app.use(cors());
    app.use('/api/v1/users', users);
    app.use('/api/v1/me', users);
    app.use('/api/v1/subscription', subscription);
    app.use('/api/v1/authentication', authentication);
   
}