const _ = require("lodash");
const apiBorrowingProcess = {};
const dbClient = require("../services/postgres");

apiBorrowingProcess.create = async function (req, res) {
    try {
        const borrower_id = req.userId;
        const { book_id, dueDate } = req.body;
        // postData.userId = req.userId;
        const [day, month, year] = dueDate.split("/");

        const dateToInsert = new Date(`${year}-${month}-${day}`);
        const result = await dbClient.query(
            `INSERT INTO BorrowingProcesses (book_id, borrower_id, due_date) VALUES ($1, $2, $3) RETURNING *;`,
            [book_id, borrower_id, dateToInsert]
        );

        return res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err.message });
    }
};

apiBorrowingProcess.getOne = async function (req, res) {
    try {
        const bookId = req.params.id;
        const result = await dbClient.query(
            `SELECT * FROM borrowingProcesses where borrowing_id=$1`,
            [bookId]
        );
        if (!result) {
            return res.status(400).json("No borrowing process found with this id");
        }

        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: err.message });
    }
};

apiBorrowingProcess.getMyBorrowedBooks = async function (req, res) {
    try {
        const borrower_id = req.userId;
        console.log("AAAA");
        console.log(borrower_id);

        const result = await dbClient.query(
            `SELECT * FROM borrowingProcesses where borrower_id=$1`,
            [borrower_id]
        );
        if (!result) {
            return res.status(400).json("No borrowing process found with this id");
        }

        return res.status(200).json(result.rows);
    } catch (err) {
        console.log("AAA");
        console.log(err);
        return res.status(400).json({ err: err.message });
    }
};
apiBorrowingProcess.getAll = async function (req, res) {
    try {
        const result = await dbClient.query(`SELECT * FROM borrowingProcesses`);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};
apiBorrowingProcess.update = async function (req, res) {
    const borrowingId = req.params.id;
    const query = `
       UPDATE borrowingProcesses
       SET return_date=NOW()
       WHERE borrowing_id =$1
     RETURNING *`;

    const result = await dbClient.query(query, [borrowingId]);

    return res.status(200).json(result.rows[0]);
};

apiBorrowingProcess.delete = async function (req, res) {
    try {
        const borrowingId = req.params.id;
        const query = "DELETE FROM borrowingProcesses WHERE borrowing_id = $1 RETURNING *";
        const result = await dbClient.query(query, [borrowingId]);

        if (result.rowCount === 0) {
            // If no rows were affected, the resource was not found
            return res.status(400).json({ message: "borrowing process not found" });
        }
        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

apiBorrowingProcess.getOverdue = async function (req, res) {
    try {
        const overDueBorrowingProcesses = await dbClient.query(
            `SELECT * FROM borrowingProcesses WHERE NOW()>due_date`
        );

        return res.status(200).json({ overdueBorrowingProcessess: overDueBorrowingProcesses.rows });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

module.exports = apiBorrowingProcess;
