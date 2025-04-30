const { router } = require("../../common/common");
const {
  getTodos,
  getMyTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./taskController");

function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
}

router.get("/me", middleware, getTodos);
router.post("/new", createTodo);
router.put("/:itemId", middleware, updateTodo);
router.delete("/:id", middleware, deleteTodo);


module.exports = router;
