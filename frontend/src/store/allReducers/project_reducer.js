import {
  RESET_MESSAGE,
  ADD_PROJECT_PROGRESS,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
  GET_PROJECT_LIST_PROGRESS,
  GET_PROJECT_LIST_SUCCESS,
  GET_PROJECT_LIST_FAILURE,
  EDIT_PROJECT_STATUS_PROGRESS,
  EDIT_PROJECT_STATUS_SUCCESS,
  EDIT_PROJECT_STATUS_FAILURE,
} from "../types";

const initialState = {
  project_theme: [],
  totalRecords: 0,
  error: false,
  message: null,
  loading: false,
};

const project_reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT_PROGRESS:
      return { ...state, loading: true };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        project_theme: [...state.project_theme, action.payload],
        error: false,
        message: action.payload.message,
        loading: false,
      };
    case ADD_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: action.payload.message,
        loading: false,
      };

    case GET_PROJECT_LIST_SUCCESS:
      return { ...state, project_theme: action.project_theme, totalRecords: action.totalRecords, loading: false, };
    case GET_PROJECT_LIST_FAILURE:
      return { ...state, error: true, loading: false, };
    case GET_PROJECT_LIST_PROGRESS:
      return { ...state, error: false, loading: true };

    case EDIT_PROJECT_STATUS_PROGRESS:
      return { ...state, loading: true };
    case EDIT_PROJECT_STATUS_SUCCESS:
      return {
        ...state,
        project_theme: state.project_theme.map((project_theme) =>
          project_theme._id === action.payload._id ? action.payload : project_theme
        ),
        message:action.payload.message,
        loading: false,
      };
    case EDIT_PROJECT_STATUS_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: action.payload.message,
        loading: false,
      };

    case RESET_MESSAGE:
      return { ...state, message: null }; 

    default:
      return state;
  }
};

export default project_reducer;
