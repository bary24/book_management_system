const todoModel = require("../models/todo");
const _ = require("lodash");
const apiTodos = {};

apiTodos.create = async function (req, res) {
    const postData = req.body;

    const todoObj = await todoModel.create(postData);

    return res.status(201).json(todoObj);
};

apiTodos.getOne = async function (req, res) {
    const todoId = req.params.id;
    const todoObj = await todoModel.findById(todoId);
    if (!todoObj) {
        return res.status(400).json("No todo found with this id");
    }

    return res.status(200).json(todoObj);
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
    const todoId = req.params.id;
    const updates = { deleted: true };

    const deletedTodo = await todoModel.findByIdAndUpdate(todoId, updates, {
        new: true,
    });

    return res.status(200).json(deletedTodo);
};
apiTodos.hardDelete = async function (req, res) {
    const todoId = req.params.id;
    const harddeletedTodo = await todoModel.findByIdAndDelete(todoId);
    return res.status(200).json(harddeletedTodo);
};

module.exports = apiTodos;
