const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../../confg");

// Generate an access token
function generateAccessToken(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    return accessToken;
}

// Generate a refresh token
function generateRefreshToken(payload) {
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return refreshToken;
}
const userModel = require("../models/user");
module.exports = async function (req, res, next) {
    const userInfo = req.body;
    const { email, password } = userInfo;
    const savedUser = await userModel.findOne({ email });
    const validPassword = bcrypt.compare(password, savedUser.password);
    if (!validPassword) {
        logger.info(`login failed for ${email} bad password`);
        return res.sendStatus(401);
    }
    const payload = savedUser;
    delete payload.password;

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    res.set("Authorization", `Bearer ${accessToken}`);
    res.set("x-refresh-token", refreshToken);
    return next();
};
