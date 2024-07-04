const userRoutes = (() => {
    const router = require('express').Router();
    const userController = require('../controllers/userController');

    router.post('/add_user', userController.saveUserInfo);

    router.post('/login', userController.login);

    return router;

})();
module.exports = userRoutes;