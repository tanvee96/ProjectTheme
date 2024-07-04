((applicationRoutes) => {

    applicationRoutes.init = (app) => {
        const userRoutes = require('./userRoutes');
        app.use('/api', userRoutes)

        const projectThemeRoutes = require('./projectThemeRoutes');
        app.use('/api', projectThemeRoutes)

        const dashboardRoutes = require('./dashboardRoutes');
        app.use('/api', dashboardRoutes)
    }
})(module.exports);


