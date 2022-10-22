const { Sequelize } = require('sequelize')
const { database } = require('./config')

const sequelize = new Sequelize(`postgres://${database.username}:${database.password}@${database.host}:${database.port}/${database.name}`)

sequelize.authenticate()
    .then((_) => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;