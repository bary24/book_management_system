const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const routers = require("./routes/routers");
const { ACCESS_TOKEN_SECRET } = require("../config");
console.log(ACCESS_TOKEN_SECRET);

const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(async (req, res, next) => {
    if (req.path === "/borrowers" && req.method === "POST") {
        return next();
    }
    if (req.path === "/signin") {
        return next();
    }
    if (!req.headers.authorization) {
        return res.sendStatus(403);
    }

    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
        return res.sendStatus(403);
    }

    try {
        const decoded = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        console.log("SJWKS");
        console.log(decoded);
        req.userId = decoded.borrower_id;
        console.log(req.userId);
    } catch (err) {
        console.log(err);
        return res.sendStatus(403);
    }

    next();
});

app.use("/", routers);

module.exports = app;
