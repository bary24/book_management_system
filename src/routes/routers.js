const express = require("express");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
});
const mainRouter = express.Router();
const borrowerManager = require("../controllers/borrowerController");
const booksManager = require("../controllers/bookController");
const signinManager = require("../controllers/signinController");
const seedManager = require("../services/userseeder");
const borrowingProcessManager = require("../controllers/borrowingProcessController");
const analyticsManager = require("../controllers/analyticsController");

const usersRouter = express.Router();
usersRouter.get("/:id", borrowerManager.getOne);
usersRouter.get("/", borrowerManager.getAll);
usersRouter.post("/", limiter, borrowerManager.create);
usersRouter.put("/:id", borrowerManager.update);
usersRouter.delete("/:id", borrowerManager.delete);
mainRouter.use("/borrowers", usersRouter);

const booksRouter = express.Router();
booksRouter.get("/:id", booksManager.getOne);
booksRouter.get("/", booksManager.getAll);
booksRouter.post("/", booksManager.create);
booksRouter.put("/:id", booksManager.update);
booksRouter.delete("/:id", booksManager.delete);
mainRouter.use("/books", booksRouter);

const borrowingProcessRouter = express.Router();

borrowingProcessRouter.get("/", borrowingProcessManager.getAll);
borrowingProcessRouter.get("/period/:month", analyticsManager.createCSVReportByMonth);
borrowingProcessRouter.get("/over_due/:month", analyticsManager.createCSVReportForOverDue);
borrowingProcessRouter.get("/overdue", borrowingProcessManager.getOverdue);
borrowingProcessRouter.get("/borrowed_books", borrowingProcessManager.getMyBorrowedBooks);
borrowingProcessRouter.get("/:id", borrowingProcessManager.getOne);
borrowingProcessRouter.post("/", limiter, borrowingProcessManager.create);
borrowingProcessRouter.put("/:id", borrowingProcessManager.update);
borrowingProcessRouter.delete("/:id", borrowingProcessManager.delete);
mainRouter.use("/borrow_processes", borrowingProcessRouter);

mainRouter.post("/signin", signinManager);
mainRouter.get("/seed", seedManager);
module.exports = mainRouter;
