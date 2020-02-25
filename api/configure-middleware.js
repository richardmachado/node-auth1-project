const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const sessionConfig = {
    
    name: 'money', 
    secret: 'the secret password is password', 
    cookie: {
        maxAge: 1000 * 300,
        secure: false, 
        httpOnly: true, 
    },
    resave: false, 
    saveUninitialized: true 
}

module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(session(sessionConfig))
};