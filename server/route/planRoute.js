const router = require("express").Router();
const plan = require("../controller/planController");

router.get("/get", plan.getPlan);
router.post("/add", plan.addPlan);
router.delete("/delete", plan.deletePlan);

module.exports = router;
