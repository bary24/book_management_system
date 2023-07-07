const todoModel = require("../models/todo");
const userModel = require("../models/user");
const _ = require("lodash");
const apiTodos = {};

apiTodos.create = async function (req, res) {
    try {
        const postData = req.body;
        postData.userId = req.userId;
        console.log("USERID");
        console.log(req.userId);

        const todoObj = await todoModel.create(postData);
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(400).json({ err: "No user found with this id" });
        }
        user.todos.push(todoObj._id);
        await user.save();

        return res.status(201).json(todoObj);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err.message });
    }
};

apiTodos.getOne = async function (req, res) {
    try {
        const todoId = req.params.id;
        const todoObj = await todoModel.findById(todoId);
        if (!todoObj) {
            return res.status(400).json("No todo found with this id");
        }

        return res.status(200).json(todoObj);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err.message });
    }
};
apiTodos.getAll = async function (req, res) {
    try {
        const todo = await todoModel.find({});
        if (!todo) {
            return res.status(400).json("No todo found");
        }

        return res.status(200).json(todo);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};
apiTodos.update = async function (req, res) {
    const todoId = req.params.id;
    const updates = req.body;
    if (!_.isObject(updates) || !updates) {
        return res.status(400).json({ success: false, error: "Invalid update input" });
    }

    const updatedTodo = await todoModel.findByIdAndUpdate(todoId, updates, {
        new: "true",
    });

    return res.status(200).json(updatedTodo);
};

apiTodos.softDelete = async function (req, res) {
    try {
        const todoId = req.params.id;
        const updates = { deleted: true };

        const deletedTodo = await todoModel.findByIdAndUpdate(todoId, updates, {
            new: true,
        });

        return res.status(200).json(deletedTodo);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};
apiTodos.hardDelete = async function (req, res) {
    try {
        const todoId = req.params.id;
        await todoModel.findByIdAndDelete(todoId);
        return res
            .status(200)
            .json({ result: `Todo with id ${todoId} has been deleted successfully` });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

module.exports = apiTodos;
