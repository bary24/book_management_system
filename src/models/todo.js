const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const objectId = mongoose.Schema.Types.ObjectId;
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: objectId, required: true, ref: "User" },
    deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
