const { ProjectThemeTableModel } = require("../models/projectThemeModel");
const { handleServerError } = require("../utils/errorHandler");

const dashboardController = (() => {
  const getDashboardTotalRecords = async (req, res) => {
    try {
      const totalProjects = await ProjectThemeTableModel.countDocuments();
      const closedProjects = await ProjectThemeTableModel.countDocuments({ status: "Closed" });
      const runningProjects = await ProjectThemeTableModel.countDocuments({ status: "Running" });
      const cancelledProjects = await ProjectThemeTableModel.countDocuments({ status: "Cancelled" });

      const today = new Date();
      const closureDelay = await ProjectThemeTableModel.countDocuments({
        status: "Running",
        endDate: { $lt: today },
      });

      res.json({
        totalProjects,
        closedProjects,
        runningProjects,
        cancelledProjects,
        closureDelay,
      });
    } catch (error) {
      handleServerError(res, error, 'Error fetching dashboard records');
    }
  };

  const getDeptWiseSuccessPercentage = async (req, res) => {
    try {
      const projects = await ProjectThemeTableModel.aggregate([
        {
          $group: {
            _id: "$department",
            total: { $sum: 1 },
            closed: { $sum: { $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] } },
          },
        },
        {
          $project: {
            department: { $substr: [{ $toUpper: "$_id" }, 0, 3] },
            total: 1,
            closed: 1,
            percentage: {
              $round: [
                {
                  $cond: [
                    { $eq: ["$total", 0] },
                    0,
                    { $multiply: [{ $divide: ["$closed", "$total"] }, 100] },
                  ],
                },
                0,
              ],
            },
          },
        },
      ]);

      res.json(projects);
    } catch (error) {
      handleServerError(res, error, 'Error fetching department-wise success percentage');
    }
  };

  return {
    getDashboardTotalRecords,
    getDeptWiseSuccessPercentage,
  };
})();

module.exports = dashboardController;
