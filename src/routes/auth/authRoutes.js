const router = require("express").Router();
const { login, register, getUser } = require("./authControllers");

function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
}

router.post("/login", login);
router.post("/register", register);
router.get("/me", middleware, getUser);

module.exports = router;
