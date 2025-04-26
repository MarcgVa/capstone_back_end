const { router } = require("../../common/common");
const {
  getTodos,
  getMyTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./todoController");

function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
}

router.get("/todos", middleware, getTodos);
router.get("/me", middleware, getMyTodos);
router.post("/new", createTodo);
router.put("/:itemId", middleware, updateTodo);
router.get("/itemId", middleware, deleteTodo);

module.exports = router;
