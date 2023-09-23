const express = require("express");
const mainRouter = express.Router();
const borrowerManager = require("../controllers/borrowerController");
const booksManager = require("../controllers/bookController");
const signinManager = require("../controllers/signinController");
const seedManager = require("../services/userseeder");
const borrowingProcessManager = require("../controllers/borrowingProcessController");
const dashboardManager = require("../controllers/dashboardController");

const usersRouter = express.Router();
usersRouter.get("/:id", borrowerManager.getOne);
usersRouter.get("/", borrowerManager.getAll);
usersRouter.post("/", borrowerManager.create);
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
borrowingProcessRouter.get("/borrowed_books", borrowingProcessManager.getMyBorrowedBooks);
borrowingProcessRouter.get("/:id", borrowingProcessManager.getOne);
borrowingProcessRouter.post("/", borrowingProcessManager.create);
borrowingProcessRouter.put("/:id", borrowingProcessManager.update);
borrowingProcessRouter.delete("/:id", borrowingProcessManager.delete);
mainRouter.use("/borrow_processes", borrowingProcessRouter);

mainRouter.get("/dashboard", dashboardManager.getAll);
mainRouter.post("/signin", signinManager);
mainRouter.get("/seed", seedManager);
module.exports = mainRouter;
