
const express = require('express')
const app = express();
const cors = require('cors');
const session = require('express-session');
const config = require('./config/config');
const cartRoutes = require("./routes/shopping_cart");
require('./config/mongoose')
const keycloak = require('./config/keycloak');
const session_config = require('./config/session_config');

app.use(express.json());
app.use(cors());
app.use(session(session_config));
app.use(keycloak.middleware());

app.use('/api', cartRoutes);
app.get('*', (req, res) => {
    res.status(404);
})

app.listen(config.server.port, () => {
    console.log(`Bookstore API listening on port ${config.server.port}`)
})
