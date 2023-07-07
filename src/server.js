const app = require("./app");
const connectMongo = require("./services/mongo");
const mongoose = require("mongoose");

const port = process.env.port || 8000;

const startingServerPromise = startServer();
async function startServer() {
    await connectMongo();

    await mongoose.syncIndexes();

    app.listen(port, function () {
        console.log(`working on ${port}`);
    });
}

module.exports = startingServerPromise;
