const _ = require("lodash");
const apiBooks = {};
const dbClient = require("../services/postgres");

apiBooks.create = async function (req, res) {
    try {
        const { title, author, ISBN, quantity, shelfLocation } = req.body;
        // postData.userId = req.userId;

        const result = await dbClient.query(
            `INSERT INTO books (title, author, ISBN , quantity, shelf_location) VALUES ($1, $2, $3 ,$4, $5) RETURNING *;`,
            [title, author, ISBN, quantity, shelfLocation]
        );

        return res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err.message });
    }
};

apiBooks.getOne = async function (req, res) {
    try {
        const bookId = req.params.id;
        const result = await dbClient.query(`SELECT * FROM books where book_id=$1`, [bookId]);
        if (!result) {
            return res.status(400).json("No todo found with this id");
        }

        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err.message });
    }
};
apiBooks.getAll = async function (req, res) {
    try {
        const result = await dbClient.query(`SELECT * FROM books`);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};
apiBooks.update = async function (req, res) {
    const bookId = req.params.id;
    const updatedFields = req.body;
    const values = Object.values(updatedFields);
    const setStatements = Object.keys(updatedFields).map((key, index) => `${key} = $${index + 1}`);
    const query = `
       UPDATE books
       SET ${setStatements.join(", ")}
       WHERE book_id =$${setStatements.length + 1}
     RETURNING *`;

    if (!_.isObject(updatedFields) || !updatedFields) {
        return res.status(400).json({ success: false, error: "Invalid update input" });
    }

    const result = await dbClient.query(query, [...values, bookId]);

    return res.status(200).json(result.rows[0]);
};

apiBooks.delete = async function (req, res) {
    try {
        const bookId = req.params.id;
        const query = "DELETE FROM books WHERE book_id = $1 RETURNING *";
        const result = await dbClient.query(query, [bookId]);

        if (result.rowCount === 0) {
            // If no rows were affected, the resource was not found
            return res.status(400).json({ message: "book not found" });
        }
        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

module.exports = apiBooks;
