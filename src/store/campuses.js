import axios from 'axios';

//action type constants
const GET_CAMPUS = 'GET_CAMPUS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';

//action creators
const _getCampus = (campuses) => {
  return {
    type: GET_CAMPUS,
    payload: campuses
  };
};

const _addCampus = (campus) => {
  return {
    type: ADD_CAMPUS,
    payload: campus
  };
};

const _deleteCampus = (campusId) => {
  return {
    type: DELETE_CAMPUS,
    payload: campusId
  };
};

const _editCampus = (campus) => {
  return {
    type: EDIT_CAMPUS,
    campus
  };
};

//thunks
export const getCampus = () => {
  return async(dispatch) => {
    const campuses = (await axios.get('/api/campuses')).data;
    dispatch(_getCampus(campuses));
  };
};

export const addCampus = (campus) => {
  return async(dispatch) => {
    const newCampus = (await axios.post('/api/campuses', campus)).data;
    dispatch(_addCampus(newCampus));
  };
};

export const deleteCampus = (campusId) => {
  return async(dispatch) => {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(_deleteCampus(campusId));
  };
};

export const editCampus = (campus) => {
  return async(dispatch) => {
    // console.log('STORE campus-->', campus)
    const newCampus = (await axios.put(`/api/campuses/${campus.id}`, campus)).data;
    // console.log(newCampus)
    dispatch(_editCampus(newCampus));
  };
};

export const unregister = (studentId) => {
  return async(dispatch) => {
    const newCampus = (await axios.put(`api/students/unregister/${studentId}`)).data;
    dispatch(_editCampus(newCampus));
  };
};

//reducer
export default function campusReducer(state = [], action) {
  switch(action.type) {
    case GET_CAMPUS:
      return action.payload;
    case ADD_CAMPUS:
      return [...state, action.payload];
    case DELETE_CAMPUS:
      return state.filter(campus => campus.id !== action.payload);
    case EDIT_CAMPUS:
     return state.map(campus => campus.id === action.campus.id ? action.campus : campus);
    default:
      return state;
  };
};
