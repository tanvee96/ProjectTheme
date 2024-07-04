import { put, takeLatest, all, call } from "redux-saga/effects";
import axiosClient from "../axios";
import {
  LOGIN_PROGRESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_PROGRESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  ADD_PROJECT_PROGRESS,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
  GET_PROJECT_LIST_PROGRESS,
  GET_PROJECT_LIST_SUCCESS,
  GET_PROJECT_LIST_FAILURE,
  EDIT_PROJECT_STATUS_PROGRESS,
  EDIT_PROJECT_STATUS_SUCCESS,
  EDIT_PROJECT_STATUS_FAILURE,
  GET_DASHBOARD_TOTAL_RECORDS_SUCCESS,
  GET_DASHBOARD_TOTAL_RECORDS_FAILURE,
  GET_DASHBOARD_TOTAL_RECORDS_PROGRESS,
  GET_DEPT_WISE_SUCCESS_PERCENTAGE_SUCCESS,
  GET_DEPT_WISE_SUCCESS_PERCENTAGE_FAILURE,
  GET_DEPT_WISE_SUCCESS_PERCENTAGE_PROGRESS,
} from "./types";

function* loginSaga(action) {
  try {
    const response = yield axiosClient.post("/login", action.payload);
    sessionStorage.setItem("loginUser", JSON.stringify(response.data));
    yield put({ type: LOGIN_SUCCESS, loginUser: response.data });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
  }
}
function* watchLogin() {
  yield takeLatest(LOGIN_PROGRESS, loginSaga);
}

function* logoutSaga() {
  try {
    const logoutSession = sessionStorage.removeItem("loginUser");
    yield put({ type: LOGOUT_SUCCESS, loginUser: logoutSession });
  } catch (error) {
    yield put({ type: LOGOUT_FAILURE, payload: error.message });
  }
}

function* watchLogout() {
  yield takeLatest(LOGOUT_PROGRESS, logoutSaga);
}

function* addProjectSaga(action) {
  try {
    let getSessionValue = sessionStorage.getItem("loginUser");
    let loggedUser = JSON.parse(getSessionValue)
    let headers = {
      "x-access-token": loggedUser?.token||null, 
    };

    const response = yield axiosClient.post("/add_project", action.payload, { headers });
    yield put({ type: ADD_PROJECT_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_PROJECT_FAILURE, payload: error.message });
  }
}
function* watchAddProject() {
  yield takeLatest(ADD_PROJECT_PROGRESS, addProjectSaga);
}

function* getProjectListSaga(action) {
  try {
    const data = action.payload;
    let getSessionValue = sessionStorage.getItem("loginUser");
    let loggedUser = JSON.parse(getSessionValue)
    let headers = {
      "x-access-token": loggedUser?.token||null, 
    };

    const response = yield axiosClient.get(`/project_list?page=${data.page}&&sortField=${data.sortField}&&searchKey=${data.searchKey}`, { headers });
    yield put({
      type: GET_PROJECT_LIST_SUCCESS,
      project_theme: response.data.data,
      totalRecords: response.data.totalRecords,
    });
  } catch (error) {
    yield put({ type: GET_PROJECT_LIST_FAILURE });
  }
}
function* watchGetProjectList() {
  yield takeLatest(GET_PROJECT_LIST_PROGRESS, getProjectListSaga);
}

function* editProjectStatus(action) {
  try {
    const data = action.payload;
    let getSessionValue = sessionStorage.getItem("loginUser");
    let loggedUser = JSON.parse(getSessionValue)
    let headers = {
      "x-access-token": loggedUser?.token||null, 
    };

    const response = yield axiosClient.put(
      `/update_project_status`,
      data, { headers }
    );
    yield put({ type: EDIT_PROJECT_STATUS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_PROJECT_STATUS_FAILURE, payload: error.message });
  }
}
function* watchEditProjectStatus() {
  yield takeLatest(EDIT_PROJECT_STATUS_PROGRESS, editProjectStatus);
}


function* getDashboardTotalCountSaga() {
  try {
    let getSessionValue = sessionStorage.getItem("loginUser");
    let loggedUser = JSON.parse(getSessionValue)
    let headers = {
      "x-access-token": loggedUser?.token||null, 
    };

    const response = yield axiosClient.get(`/dahboard_total_record`, { headers });
    yield put({
      type: GET_DASHBOARD_TOTAL_RECORDS_SUCCESS,
      totalProjects: response.data.totalProjects,
      closedProjects: response.data.closedProjects,
      runningProjects: response.data.runningProjects,
      cancelledProjects: response.data.cancelledProjects,
      closureDelay: response.data.closureDelay,
    });
  } catch (error) {
    yield put({ type: GET_DASHBOARD_TOTAL_RECORDS_FAILURE });
  }
}
function* watchGetDashboardTotalCount() {
  yield takeLatest(GET_DASHBOARD_TOTAL_RECORDS_PROGRESS, getDashboardTotalCountSaga);
}


function* getDeptWiseSuccessPercentSaga() {
  try {
    let getSessionValue = sessionStorage.getItem("loginUser");
    let loggedUser = JSON.parse(getSessionValue)
    let headers = {
      "x-access-token": loggedUser?.token||null, 
    };

    const response = yield axiosClient.get(`/department_wise_success_percentage`, { headers });
    yield put({
      type: GET_DEPT_WISE_SUCCESS_PERCENTAGE_SUCCESS,
      dept_success_percentage: response.data,
    });
  } catch (error) {
    yield put({ type: GET_DEPT_WISE_SUCCESS_PERCENTAGE_FAILURE });
  }
}
function* watchGetDeptWiseSuccessPercent() {
  yield takeLatest(GET_DEPT_WISE_SUCCESS_PERCENTAGE_PROGRESS, getDeptWiseSuccessPercentSaga);
}
export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchLogout(),
    watchAddProject(),
    watchGetProjectList(),
    watchEditProjectStatus(),
    watchGetDashboardTotalCount(),
    watchGetDeptWiseSuccessPercent(),
  ]);
}
