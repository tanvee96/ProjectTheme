const { ProjectThemeTableModel } = require('../models/projectThemeModel');
const { handleServerError } = require('../utils/errorHandler');

const projectThemeController = (() => {

    const saveProject = async (req, res) => {
        try {
            const projectInfo = new ProjectThemeTableModel({
                project_theme_name: req.body.project_theme_name,
                reason: req.body.reason,
                project_type: req.body.project_type,
                division: req.body.division,
                category: req.body.category,
                priority: req.body.priority,
                department: req.body.department,
                location: req.body.location,
                status: req.body.status,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
            });

            const result = await projectInfo.save();
            res.json({ message: 'Record added successfully!', ...result });
        } catch (error) {
            handleServerError(res, error, 'Please try again later');
        }
    };

    const updateProjectStatus = async (req, res) => {
        try {
            const updatedBy = { _id: req.body._id };
            const updateStatus = { status: req.body.status };

            const result = await ProjectThemeTableModel.findOneAndUpdate(updatedBy, updateStatus, { new: true });
            res.json({ message: 'Status updated successfully!', ...result });
        } catch (error) {
            handleServerError(res, error, 'Please try again later');
        }
    };

    const getProject = async (req, res) => {
        try {
            const sortField = req.query.sortField || 'priority';
            const sortOrder = 1; // asc
            const pageNumber = parseInt(req.query.page) || 1;
            const pageSize = 10;
            const searchKey = req.query.searchKey === 'undefined' ? '' : req.query.searchKey;

            const query = searchKey ? {
                "$or": [
                    { project_theme_name: new RegExp(searchKey, 'i') },
                    { reason: new RegExp(searchKey, 'i') },
                    { project_type: new RegExp(searchKey, 'i') },
                    { division: new RegExp(searchKey, 'i') },
                    { category: new RegExp(searchKey, 'i') },
                    { priority: new RegExp(searchKey, 'i') },
                    { department: new RegExp(searchKey, 'i') },
                    { location: new RegExp(searchKey, 'i') },
                    { status: new RegExp(searchKey, 'i') },
                ]
            } : {};

            const totalRecords = await ProjectThemeTableModel.countDocuments(query);
            const data = await ProjectThemeTableModel.find(query)
                .sort({ [sortField]: sortOrder })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);

            res.json({ totalRecords, data });
        } catch (error) {
            handleServerError(res, error, 'Error getting data');
        }
    };

    return {
        saveProject,
        updateProjectStatus,
        getProject,
    };
})();

module.exports = projectThemeController;
