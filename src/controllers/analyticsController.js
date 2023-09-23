const _ = require("lodash");
const apiAnalytics = {};
const dbClient = require("../services/postgres");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function _createCsvWriter(options) {
    const csvFilePath = `/Users/ahmedabdelbary/Desktop/Job_task/src/csv_files/${options.key}_borrowing_processes_${options.month}.csv`;

    const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
            { id: "borrowing_id", title: "Borrowing ID" },
            { id: "book_id", title: "Book ID" },
            { id: "borrower_id", title: "Borrower ID" },
            { id: "checkout_date", title: "Checkout Date" },
            { id: "due_date", title: "Due Date" },
            { id: "return_date", title: "Return Date" },
        ],
    });

    return csvWriter;
}

apiAnalytics.createCSVReportByMonth = async function (req, res) {
    try {
        const month = Number(req.params.month);
        const query = `
        SELECT *
        FROM borrowingProcesses
        WHERE EXTRACT(MONTH FROM checkout_date) = $1;
      `;
        const csvWriter = await _createCsvWriter({ month: month, key: "normal" });
        const borrowingProcesses = await dbClient.query(query, [month]);
        console.log(borrowingProcesses);

        await csvWriter.writeRecords(borrowingProcesses.rows);

        return res.status(200).json("DONE");
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

apiAnalytics.createCSVReportForOverDue = async function (req, res) {
    try {
        const month = Number(req.params.month);
        const query = `
        SELECT *
        FROM borrowingProcesses
        WHERE EXTRACT(MONTH FROM checkout_date) = $1 AND NOW()>due_date;
      `;
        const csvWriter = await _createCsvWriter({ month: month, key: "overdue" });
        const borrowingProcesses = await dbClient.query(query, [month]);
        console.log(borrowingProcesses);

        await csvWriter.writeRecords(borrowingProcesses.rows);

        return res.status(200).json(borrowingProcesses.rows);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }
};

module.exports = apiAnalytics;
