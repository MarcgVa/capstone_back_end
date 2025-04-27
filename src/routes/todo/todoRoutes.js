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

router.get("/all", middleware, getTodos);
router.get("/assigned", middleware, getMyTodos);
router.post("/new", createTodo);
router.put("/:id", middleware, updateTodo);
router.delete("/:id", middleware, deleteTodo);


module.exports = router;
