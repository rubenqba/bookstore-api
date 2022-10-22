const { default: mongoose } = require('mongoose')
const { database } = require('./config');

// const dbUrl = `mongodb://${database.username}:${database.password}@${database.host}:${database.port}/${database.name}`;
const dbUrl = database.url
let db;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_db => {
        db = _db;
        console.log("Database is online");
    }).catch(error => console.error("MongoDB connection error:", error))


