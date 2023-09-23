const _ = require("lodash");
const apiBorrowers = {};
const bcrypt = require("bcrypt");
const dbClient = require("../services/postgres");

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

apiBorrowers.create = async function (req, res) {
    try {
        let { name, email, password } = req.body;
        // postData.userId = req.userId;
        password = await hashPassword(password);
        const result = await dbClient.query(
            `INSERT INTO borrowers (name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
            [name, email, password]
        );

        return res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err.message });
    }
};

apiBorrowers.getAll = async function (req, res) {
    try {
        const result = await dbClient.query(`SELECT * FROM borrowers`);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

apiBorrowers.getOne = async function (req, res) {
    try {
        const borrowerId = req.params.id;
        const result = await dbClient.query(`SELECT * FROM borrowers where borrower_id=$1`, [
            borrowerId,
        ]);
        if (!result) {
            return res.status(400).json("No todo found with this id");
        }

        console.log(result);

        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err.message });
    }
};

apiBorrowers.update = async function (req, res) {
    const borrowerId = req.params.id;
    const updatedFields = req.body;
    const values = Object.values(updatedFields);
    const setStatements = Object.keys(updatedFields).map((key, index) => `${key} = $${index + 1}`);
    const query = `
       UPDATE borrowers
       SET ${setStatements.join(", ")}
       WHERE borrower_id =$${setStatements.length + 1}
     RETURNING *`;

    if (!_.isObject(updatedFields) || !updatedFields) {
        return res.status(400).json({ success: false, error: "Invalid update input" });
    }

    const result = await dbClient.query(query, [...values, borrowerId]);

    return res.status(200).json(result.rows[0]);
};

apiBorrowers.delete = async function (req, res) {
    try {
        const borrower_id = req.params.id;
        const query = "DELETE FROM borrowers WHERE borrower_id = $1 RETURNING *";
        const result = await dbClient.query(query, [borrower_id]);

        if (result.rowCount === 0) {
            // If no rows were affected, the resource was not found
            return res.status(400).json({ message: "borrower not found" });
        }
        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

async function validateUser(data) {
    const { firstname, lastname, email, password } = data;
    if (
        [firstname, lastname, email, password]
            .map((el) => el && el.trim())
            .some((el) => !!el === false)
    ) {
        return { err: "missing fields" };
    }
}

module.exports = apiBorrowers;
