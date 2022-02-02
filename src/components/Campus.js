import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditCampus from './EditCampus';
import { unregister } from '../store/students';

class Campus extends React.Component {
  constructor() {
    super();
    this.state = {
      campus: {}
    };
  };

  async componentDidMount() {
    const campusId = window.location.hash.slice(window.location.hash.length-1);
    const campus = (await axios.get(`/api/campuses/${campusId}`)).data;
    this.setState({ campus });
  };

  unregister(studentId){
    this.props.unregister(studentId);
  };

  render() {
    const {campus } = this.props
    if (!campus) {
      return <h1>Loading</h1>
    } else {
      return (
        <div>
          <img key={campus.id+'image'} src={campus.imageUrl}></img>
          <h3 key={campus.id+'name'}>{campus.name}</h3>
          <p key={campus.id+'address'}>Address: {campus.address}</p>
          <p key={campus.id+'description'}>Description: {campus.description}</p>
          <h3>Enrollees:</h3>
          <ul>
          {
            campus.students && campus.students.length > 0 ? campus.students.map(student => {
              console.log(campus)
              return ([
                <Link key={student.id+'name'} to={`/students/${student.id}`}><li key={student.id+'name'}>{student.firstName}</li></Link>,
                <button onClick={() => this.unregister(student.id)}>Unregister</button>
              ])
            }) : <p>This campus has no students!</p>
          }
          </ul>
          <EditCampus campus={campus}/>
        </div>
      )
    };
  };
};

const mapStateToProps = (state, ownProps) => {
  // console.log('In Campus OwnProps--->', ownProps)
  const campusId = window.location.hash.slice(window.location.hash.length-1);
  return {
    campus: state.campuses.filter(campus => campus.id === campusId*1)[0],
    ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    unregister: (studentId) => dispatch(unregister(studentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
