const router = require("express").Router();
const {
  getAllSchedules,
  getMySchedule,
  getMaintenanceSchedule,
  getTodaySchedule
} = require("./scheduleController");


function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
}


router.get("/schedules", middleware, getAllSchedules);
router.get("/today", middleware, getTodaySchedule);
router.get("/schedule", middleware, getMySchedule);
router.get("/maintenance", middleware, getMaintenanceSchedule);



module.exports = router;