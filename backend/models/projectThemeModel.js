var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var projectThemeSchema = new Schema({
    project_theme_name: {
        type: String,
        default: ''
    },
    reason: {
        type: String,
        default: ''
    },
    project_type: {
        type: String,
        default: ''
    },
    division: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    priority: {
        type: String,
        default: ''
    },
    department: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    startDate: {
        type: Date,
        default: ''
    },
    endDate: {
        type: Date,
        default: ''
    },
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"user_master"
    // },
})

module.exports = {
    ProjectThemeTableModel: mongoose.model('project_theme', projectThemeSchema, 'project_theme')
}