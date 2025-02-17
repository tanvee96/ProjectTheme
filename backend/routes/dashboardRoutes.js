const dashboardRoutes = (() => {
  const router = require("express").Router();
  const dashboardController = require("../controllers/dashboardController");
  const authentication = require("../config/authToken");

  router.get("/dahboard_total_record", authentication, dashboardController.getDashboardTotalRecords);

  router.get("/department_wise_success_percentage", authentication, dashboardController.getDeptWiseSuccessPercentage);

  router.get("/division_wise_chart", authentication, dashboardController.getDivisionWiseChart);

  return router;
})();
module.exports = dashboardRoutes;
