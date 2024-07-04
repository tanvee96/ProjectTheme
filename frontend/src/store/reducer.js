import { combineReducers } from 'redux'
import user_reducer from './allReducers/user_reducer'
import project_reducer from './allReducers/project_reducer'
import dashboard_reducer from './allReducers/dashboard_reducer'

export default combineReducers({
    user:user_reducer,
    project:project_reducer,
    dashboard: dashboard_reducer
})