import axios from 'axios';

//action type constants
const GET_STUDENTS = 'GET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';

//action creaters
const _getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    payload: students
  };
};

const _addStudent = (student) => {
  return {
    type: ADD_STUDENT,
    payload: student,
  };
};

const deleteStudent = (id) => {
  return {
    type: DELETE_STUDENT,
    id
  };
};

const _editStudent = (student) => {
  return {
    type: EDIT_STUDENT,
    payload: student
  };
};

//thunks
export const getStudents = () => {
  return async(dispatch) => {
    const students = (await axios.get('/api/students')).data;
    dispatch(_getStudents(students));
  };
};

export const addStudent = (student) => {
  return async(dispatch) => {
    const newStudent = (await axios.post('/api/students', student)).data;
    dispatch(_addStudent(newStudent));
  };
};

export const _deleteStudent = (studentId) => {
  return async(dispatch) => {
    await axios.delete(`api/students/${studentId}`);
    dispatch(deleteStudent(studentId));
  };
};

export const editStudent = (student) => {
  return async(dispatch) => {
    const newStudent = (await axios.put(`api/students/${student.id}`, student)).data;
    console.log(newStudent)
    dispatch(_editStudent(newStudent));
  };
};

export const unregister = (studentId) => {
  return async(dispatch) => {
    const newStudent = (await axios.put(`api/students/unregister/${studentId}`)).data;
    dispatch(_editStudent(newStudent));
  };
};

//reducers
export default function studentReducer(state = [], action) {
  switch(action.type) {
    case GET_STUDENTS:
      return action.payload;
    case ADD_STUDENT:
      return [...state, action.payload];
    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.id);
    case EDIT_STUDENT:
      return state.map(student => student.id === action.payload.id ? action.payload : student);
    default:
      return state;
  };
};
