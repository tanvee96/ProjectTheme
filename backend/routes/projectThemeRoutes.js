const projectThemeRoutes = (() => {

    const router = require('express').Router();
    const projectThemeController =require('../controllers/projectThemeController');
    const authentication = require("../config/authToken");

    router.post('/add_project', authentication, projectThemeController.saveProject);
    router.put('/update_project_status', authentication,projectThemeController.updateProjectStatus);
    router.get('/project_list', authentication, projectThemeController.getProject);   

     return router;
})();
module.exports = projectThemeRoutes;
