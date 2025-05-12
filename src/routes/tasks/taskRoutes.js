const router = require("express").Router();
const {
  getTasks,
  getTaskById,
  getMyTasks,
  getNewConsults,
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
router.get("/me", middleware, getMyTasks);
router.get("/consults", middleware, getNewConsults);
router.get("/:id", middleware, getTaskById);
router.post("/new", createTask);
router.put("/:id", middleware, updateTask);
router.delete("/:id", middleware, deleteTask);

module.exports = router;
