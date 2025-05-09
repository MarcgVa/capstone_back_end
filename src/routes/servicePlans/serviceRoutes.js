const router = require("express").Router();
const {
  getServicePlans,
  newServicePlan,
} = require("./serviceController");

function middleware(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    next();
  } else {
    res.send("Please log in again");
  }
}

// router.get("/list", middleware, getServices);
// router.get("/:id", middleware, getService);
// router.delete("/:id", middleware, deleteService);
// router.post("/new",middleware, addService)

router.get("/plans", getServicePlans);

router.post("/admin/new",middleware,newServicePlan)
// router.put("/admin/:id", middleware, updateServicePlan);
// router.delete("/admin/:id", middleware, deleteServicePlan);



module.exports = router;
