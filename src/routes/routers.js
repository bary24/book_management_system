const express = require("express");
const mainRouter = express.Router();
const usersManager = require("../controllers/userController");
const todosManager = require("../controllers/todoController");
const signinManager = require("../controllers/signinController");
const seedManager = require("../services/userseeder");

const usersRouter = express.Router();
usersRouter.get("/:id", usersManager.getOne);
usersRouter.get("/", usersManager.getAll);
usersRouter.post("/", usersManager.create);
usersRouter.put("/:id", usersManager.update);
usersRouter.patch("/:id", usersManager.softDelete);
usersRouter.delete("/:id", usersManager.hardDelete);
mainRouter.use("/users", usersRouter);

const todosRouter = express.Router();
todosRouter.get("/:id", todosManager.getOne);
todosRouter.get("/", todosManager.getAll);
todosRouter.post("/", todosManager.create);
todosRouter.put("/:id", todosManager.update);
todosRouter.patch("/:id", todosManager.softDelete);
todosRouter.delete("/:id", todosManager.hardDelete);
mainRouter.use("/todos", todosRouter);

mainRouter.post("/signin", signinManager);
mainRouter.get("/seed", seedManager);
module.exports = mainRouter;
