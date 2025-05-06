const router = require("express").Router();
const {
  getUsers,
  getSelf,
  updateUser,
  deleteUser,
  disableUser,
} = require("./accountControllers");

function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
}

router.get("/list", middleware, getUsers);
router.get("/me", middleware, getSelf);
router.put("/:id", middleware, updateUser);
router.put("/disable/:id", middleware, disableUser);
router.delete(":id", middleware, deleteUser);


module.exports = router;
