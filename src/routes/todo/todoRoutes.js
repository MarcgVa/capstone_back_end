const { get } = require("../../../app");
const { router } = require("../common/common");
const {
  getTodos,
  getMyTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/authControllers");

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
router.post("/new", login);
router.put("/:itemId", register);
router.get("/me", middleware, getUser);

module.exports = router;
