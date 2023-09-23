const app = require("./app");
const client = require("./services/postgres");
const {
    createBooksSQLTable,
    createBorrowersSQLTable,
    createBorrowingProcessSQLTable,
    createIndices,
} = require("./models/SQLQueries");

const port = process.env.port || 8000;

const startingServerPromise = startServer();
async function connectToPostgres() {
    client
        .connect()
        .then(async () => {
            await client.query(createBooksSQLTable);
            await client.query(createBorrowersSQLTable);
            await client.query(createBorrowingProcessSQLTable);
            await client.query(createIndices);
            await console.log("Tables created");
            console.log("Connected to PostgreSQL database");
        })
        .catch((err) => {
            console.error("Error connecting to PostgreSQL:", err);
        });
}
async function startServer() {
    await connectToPostgres();

    console.log(port);
    app.listen(port, function () {
        console.log(`working on ${port}`);
    });
}

module.exports = startingServerPromise;
