const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model("Todo", todoSchema);
