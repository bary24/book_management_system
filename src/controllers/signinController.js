const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../../config");
const dbClient = require("../services/postgres");

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

module.exports = async function (req, res) {
    try {
        const userInfo = req.body;
        const { email, password } = userInfo;
        const result = await dbClient.query(`SELECT * FROM borrowers WHERE email=$1`, [email]);
        const savedUser = result.rows[0];
        console.log(savedUser);

        const validPassword = await bcrypt.compare(password, savedUser.password);

        if (!validPassword) {
            return res.status(401).json({ response: "Invalid credentials" });
        }
        const payload = savedUser;
        delete payload.password;

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        return res.json({ accessToken, refreshToken });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err.message });
    }
};
