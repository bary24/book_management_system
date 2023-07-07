const userModel = require("../models/user");
const _ = require("lodash");
const apiUsers = {};
const bcrypt = require("bcrypt");

async function hashPassword(plainPassword) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainPassword, salt);
        return hash;
    } catch (error) {
        // Handle error
        console.error("Error hashing password:", error);
        throw error;
    }
}

apiUsers.create = async function (req, res) {
    try {
        const postData = req.body;
        postData.password = await hashPassword(postData.password);

        const userObj = await userModel.create(postData);

        return res.status(201).json(userObj);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
};

apiUsers.getAll = async function (req, res) {
    try {
        const user = await userModel.find({});
        if (!user) {
            return res.status(400).json("No user found");
        }

        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

apiUsers.getOne = async function (req, res) {
    const userId = req.params.id;
    const userObj = await userModel.findById(userId);
    if (!userObj) {
        return res.status(400).json("No user found with this id");
    }

    return res.status(200).json(userObj);
};

apiUsers.update = async function (req, res) {
    const userId = req.params.id;
    const updates = req.body;
    if (!_.isObject(updates) || !updates) {
        return res.status(400).json({ success: false, error: "Invalid update input" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updates, {
        new: "true",
    });

    return res.status(200).json(updatedUser);
};

apiUsers.softDelete = async function (req, res) {
    const userId = req.params.id;
    const updates = { deleted: true };

    const deleteduser = await userModel.findByIdAndUpdate(userId, updates, {
        new: true,
    });

    return res.status(200).json(deleteduser);
};
apiUsers.hardDelete = async function (req, res) {
    const userId = req.params.id;
    const harddeleteduser = await userModel.findByIdAndDelete(userId);
    return res.status(200).json(harddeleteduser);
};

module.exports = apiUsers;
