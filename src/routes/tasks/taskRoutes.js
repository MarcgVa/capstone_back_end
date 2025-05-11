const router = require("express").Router();
const {
  getTasks,
  getTaskById,
  getMyTasks,
  updateTask,
  deleteTask,
  createTask,
} = require("./taskController");

function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
}

router.get("/all", middleware, getTasks);
router.get("/task/:id", middleware, getTaskById);
router.get("/me", middleware, getMyTasks);
router.post("/new", createTask);
router.put("/:id", middleware, updateTask);
router.delete("/:id", middleware, deleteTask);

module.exports = router;
