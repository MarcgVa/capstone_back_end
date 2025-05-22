const router = require("express").Router();
const {getListOfInvoicesForUser } = require('./billController');




function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
};




//Billing Routes

router.get("/list/:id", middleware, getListOfInvoicesForUser);

module.exports = router;