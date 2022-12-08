require('dotenv').config()

const a = ['PORT', 'DB_URL', 'KEYCLOAK_SERVER', 'KEYCLOAK_REALM', 'KEYCLOAK_CLIENT_ID'/* , 'KEYCLOAK_CLIENT_SECRET' */]
a.forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`)
    }
});

const config = {
    env: process.env.NODE_ENV,
    logger: {
        level: process.env.LOG_LEVEL || 'info',
        enabled: process.env.BOOLEAN ? process.env.BOOLEAN.toLowerCase() === 'true' : false
    },
    server: {
        port: Number(process.env.PORT || 8081)
    },
    session: {
        secret: process.env.SESSION_SECRET || (Math.random() + 1).toString(36).substring(7),
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        name: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        url: process.env.DB_URL,
    },
    keycloak: {
        serverUrl: process.env.KEYCLOAK_SERVER,
        realm: process.env.KEYCLOAK_REALM,
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        // credentials: {
        //     secret: process.env.KEYCLOAK_CLIENT_SECRET
        // },
        bearerOnly: true,
    }
}

module.exports = config