import {
  GET_DASHBOARD_TOTAL_RECORDS_FAILURE,
  GET_DASHBOARD_TOTAL_RECORDS_PROGRESS,
  GET_DASHBOARD_TOTAL_RECORDS_SUCCESS,
  GET_DEPT_WISE_SUCCESS_PERCENTAGE_FAILURE,
  GET_DEPT_WISE_SUCCESS_PERCENTAGE_PROGRESS,
  GET_DEPT_WISE_SUCCESS_PERCENTAGE_SUCCESS,
  RESET_MESSAGE,
} from "../types";

const initialState = {
  dept_success_percentage: [],
  totalProjects: 0,
  closedProjects: 0,
  runningProjects: 0,
  cancelledProjects: 0,
  closureDelay: 0,
  error: false,
  message: null,
  loading: false,
};

const dashboard_reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_TOTAL_RECORDS_SUCCESS:
      return {
        ...state,
        totalProjects: action.totalProjects,
        closedProjects: action.closedProjects,
        runningProjects: action.runningProjects,
        cancelledProjects: action.cancelledProjects,
        closureDelay: action.closureDelay,
        loading: false,
      };
    case GET_DASHBOARD_TOTAL_RECORDS_FAILURE:
      return { ...state, error: true, loading: false };
    case GET_DASHBOARD_TOTAL_RECORDS_PROGRESS:
      return { ...state, error: false, loading: true };

    case GET_DEPT_WISE_SUCCESS_PERCENTAGE_SUCCESS:
      return {
        ...state,
        dept_success_percentage: action.dept_success_percentage,
        loading: false,
      };
    case GET_DEPT_WISE_SUCCESS_PERCENTAGE_FAILURE:
      return { ...state, error: true, loading: false };
    case GET_DEPT_WISE_SUCCESS_PERCENTAGE_PROGRESS:
      return { ...state, error: false, loading: true };

    case RESET_MESSAGE:
      return { ...state, message: null };

    default:
      return state;
  }
};

export default dashboard_reducer;
