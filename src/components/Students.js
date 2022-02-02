import React from 'react';
import { Link } from 'react-router-dom';
import AddStudent from './AddStudent';
import { connect } from 'react-redux';
import { _deleteStudent } from '../store/students';

const Students = (props) => {
  const {students, deleteStudent } = props
  return (
    <div>
      <AddStudent />
      {
        students.map(student => {
          let studentCampus = '';
          if (student.campus) {
            studentCampus = `Attends ${student.campus.name}`
          } else {
            studentCampus = 'Not enrolled yet'
          }
          return ([
            <p key={student.id}>{student.firstName} {student.lastName} - {studentCampus}</p>,
            <Link to={`/students/${student.id}`} key={student.id+'name'}>Details for {student.firstName}</Link>,
            <button key={student.id+'delete'} onClick={() => deleteStudent(student.id)}>X</button>
          ])
        })
      }
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (studentId) => dispatch( _deleteStudent(studentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
