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
  deleteService
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
router.get("/list", middleware, getAllServices);
router.get("/me", middleware, getServicesForUser);
router.get("/:id", middleware, getService);
router.delete("/:id", middleware, deleteService);
router.post("/new", middleware, addService);


// ServicePlan Table Routes
router.get("/admin/plans", middleware, getServicePlans);
router.post("/admin/new", middleware, newServicePlan);
router.put("/admin/:id", middleware, updateServicePlan);
router.delete("/admin/:id", middleware, deleteServicePlan);



module.exports = router;
