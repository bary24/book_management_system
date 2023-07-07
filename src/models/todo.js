const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
