import {
  LOGIN_PROGRESS,
  LOGOUT_PROGRESS,
  ADD_PROJECT_PROGRESS,
  GET_PROJECT_LIST_PROGRESS,
  EDIT_PROJECT_STATUS_PROGRESS,
  GET_DASHBOARD_TOTAL_RECORDS_PROGRESS,
  GET_DEPT_WISE_SUCCESS_PERCENTAGE_PROGRESS,
} from "./types";

export const login = (record) => ({ type: LOGIN_PROGRESS, payload: record });

export const logout = (record) => ({ type: LOGOUT_PROGRESS, payload: record });

export const addProject = (record) => ({
  type: ADD_PROJECT_PROGRESS,
  payload: record,
});

export const getProjectList = (record) => {
  return { type: GET_PROJECT_LIST_PROGRESS, payload: record };
};

export const editProjectStatus = (record) => ({
  type: EDIT_PROJECT_STATUS_PROGRESS,
  payload: record,
});

export const getDashboardTotalCounts = (record) => {
  return { type: GET_DASHBOARD_TOTAL_RECORDS_PROGRESS, payload: record };
};

export const getDeptWiseSuccessPercentage = (record) => {
  return { type: GET_DEPT_WISE_SUCCESS_PERCENTAGE_PROGRESS, payload: record };
};