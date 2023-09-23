const _ = require("lodash");
const apiDashboard = {};
const dbClient = require("../services/postgres");

apiDashboard.getAll = async function (req, res) {
    try {
        const overDueBorrowingProcesses = await dbClient.query(
            `SELECT * FROM borrowingProcesses WHERE NOW()>due_date`
        );

        return res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

module.exports = apiDashboard;
