const initOptions = {

    // pg-promise initialization options...

    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    },
    disconnect(client) {
        const cp = client.connectionParameters;
        console.log('Disconnected from database:', cp.database);
    }

};
const databaseConfig= {
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "database": process.env.DB,
    "user": process.env.DB_USER,
    "password":process.env.DB_PASSWORD
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(databaseConfig);

module.exports = db;