const { default: mongoose } = require('mongoose')
const { database } = require('./config');

// const dbUrl = `mongodb://${database.username}:${database.password}@${database.host}:${database.port}/${database.name}`;
const dbUrl = database.url || `mongodb://${database.username}:${database.password}@${database.host}:${database.port}/${database.name}`;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_db => console.log("Database is online"))
    .catch(error => console.error("MongoDB connection error:", error))

