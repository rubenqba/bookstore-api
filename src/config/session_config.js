const session = require('express-session');
const config = require('./config');
const session_store = require('./session_store');

module.exports = {
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    store: session_store
}