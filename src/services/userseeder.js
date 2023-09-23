const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const todoModel = require("../models/SQLQueries");
const users = [];
const todos = [];

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
async function createRandomUser() {
    return {
        firstname: faker.internet.userName(),
        lastname: faker.internet.userName(),
        email: faker.internet.email(),
        password: await hashPassword(faker.internet.password()),
    };
}

async function createRandomTodo() {
    return {
        title: faker.lorem.slug(),
        content: faker.lorem.sentence(),
    };
}

async function createSeedData() {
    try {
        for (let index = 0; index < 5; index++) {
            console.log(index);
            const user = await createRandomUser();
            const todo = await createRandomTodo();
            users.push(user);
            todos.push(todo);
        }
        return { users, todos };
    } catch (err) {
        console.log(err);
    }
}

async function seedDatabase(users) {
    try {
        console.log(users);
        await UserModel.insertMany(users);
    } catch (err) {
        console.log(err);
    }
}

module.exports = async function seedController(req, res) {
    const data = await createSeedData();
    data.todos.forEach((todo) => (todo.userId = req.userId));
    await UserModel.insertMany(data.users);
    await todoModel.insertMany(data.todos);
    console.log("DONE");
    return res.status(200).json(data);
};
