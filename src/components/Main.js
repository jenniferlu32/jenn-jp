import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import Nav from './Nav';
import Home from './Home';
import Campuses from './Campuses';
import Campus from './Campus';
import Students from './Students';
import Student from './Student';

//thunks
import { getCampus, deleteCampus } from '../store/campuses';
import { getStudents } from '../store/students';

class Main extends React.Component {
  constructor() {
    super();
  };

  componentDidMount() {
    this.props.getCampus();
    this.props.getStudents();
  }

  render() {
    return (
      <Router>
        <Nav />
        <Route path='/' exact component={Home}></Route>
        <Route path='/campuses' exact component={() => <Campuses campuses={this.props.campuses} deleteCampus={this.props.deleteCampus}/>}></Route>
        <Route path={`/campuses/:id`} component={Campus}></Route>
        <Route path='/students' exact component={Students} ></Route>
        <Route path='/students/:id' component={Student}></Route>
      </Router>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCampus: () => dispatch(getCampus()),
    getStudents: () => dispatch(getStudents()),
    deleteCampus: (campusId) => dispatch(deleteCampus(campusId)),
    deleteStudent: (studentId) => dispatch(deleteStudent(studentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
