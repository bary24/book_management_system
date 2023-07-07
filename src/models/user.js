const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: true,
    },
    lastname: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    todos: [{ type: objectId, ref: "todos" }],
    deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
