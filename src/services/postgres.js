const { Client } = require("pg");
const { DB_PASSWORD, DB_PORT, DB_USER } = require("../../config");

// Create a PostgreSQL client
const client = new Client({
    user: DB_USER,
    host: "localhost",
    database: "bookstore",
    password: DB_PASSWORD,
    port: DB_PORT, //
});

module.exports = client;
