const { router } = require("../../common/common");
const { login, register, getUser } = require("./authControllers");
const { getUser,getUsers, getSelf,updateUser,deleteUser } = require("./accountControllers");

function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
}

router.post("/clients", middleware, getUsers);
router.post("/:id", middleware, getUser);
router.get("/me", middleware, getSelf);
router.put("/:id", middleware, updateUser);
router.delete(":id", middleware, deleteUser);

module.exports = router;
