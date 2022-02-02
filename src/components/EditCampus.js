import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { editCampus } from '../store/campuses';

class EditCampus extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.campus.id ? this.props.campus.id : 0,
      name: this.props.campus.name ? this.props.campus.name : '',
      imageUrl: this.props.campus.imageUrl ? this.props.campus.imageUrl : '',
      address: this.props.campus.address ? this.props.campus.address : '',
      description: this.props.campus.description ? this.props.campus.description : '',
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  };

  handleSubmit(ev){
    ev.preventDefault()
    this.props.editCampus(this.state);
    this.setState({
      id: 0,
      name: '',
      imageUrl: '',
      address: '',
      description: ''
    })
  }
  handleChange(ev){
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  render() {
    const { id, name, address, description } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input name='name' type='text' placeholder='Name' value={name} onChange={this.handleChange} ></input>
        <input name='imageUrl' type='text' placeholder='imageUrl' value={address} onChange={this.handleChange}  ></input>
        <input name='address' type='text' placeholder='Address' value={address} onChange={this.handleChange}  ></input>
        <input name='description' type='text' placeholder='Description' value={description} onChange={this.handleChange}  ></input>
        <button>Update</button>
      </form>
    )
  }
};

const mapState = (state, ownProps) =>{
  const campusId = window.location.hash.slice(window.location.hash.length-1);
  const campus = state.campuses.find(campus => campus.id === campusId*1) || {}
  return {
    campus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editCampus: (campus) => dispatch( editCampus(campus) )
  };
};

export default connect(mapState, mapDispatchToProps)(EditCampus);
