const Keycloak = require('keycloak-connect');
const config = require('./config');
const session_store = require('./session_store');


console.log("Initializing Keycloak...");
const keycloak = new Keycloak({ store: session_store }, config.keycloak);

module.exports = keycloak;