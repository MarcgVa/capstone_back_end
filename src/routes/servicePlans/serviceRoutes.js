const router = require("express").Router();
const {
  getServicePlans,
  newServicePlan,
  updateServicePlan,
  deleteServicePlan,
  getService,
  getAllServices,
  getServicesForUser,
  addService,
  deleteService,
  updateService,
  getServiceWithNoCutDate
} = require("./serviceController");



function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
};

// Service Table Routes
router.get("/no-cut", middleware, getServiceWithNoCutDate);
router.get("/list",middleware, getAllServices);
router.post("/new", middleware, addService);
router.get("/client/:id", middleware, getServicesForUser);
router.get("/service/:id", middleware, getService);
router.delete("/service/:id", middleware, deleteService);
router.put("/service/:id", middleware, updateService);


// ServicePlan Table Routes
router.get("/admin/plans", getServicePlans);
router.post("/admin/plans/new", middleware, newServicePlan);
router.put("/admin/plans/:id", middleware, updateServicePlan);
router.delete("/admin/:id", middleware, deleteServicePlan);



module.exports = router;
