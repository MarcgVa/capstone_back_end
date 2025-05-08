const router = require("express").Router();
const { getAllSchedules, getSchedule } = require('./scheduleController');


function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
}


router.get("/schedules", middleware, getAllSchedules);
router.get("/schedule", middleware, getSchedule);



module.exports = router;