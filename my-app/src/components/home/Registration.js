import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RegistrationForm from './RegistrationForm';
import * as userActions from '../../actions/userAuthenticationActions';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class Register extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      register: Object.assign({}, this.props.register),
      errors: {},
      saving: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    const field = e.target.name;
    let register = this.state.register;
    register[field] = e.target.value;
    return this.setState({register});
  }

  onSubmit(e){
    e.preventDefault();
    this.setState({saving: true});
    this.props.actions.registerUser(this.state.register).then(()=> toastr.success(this.props.flashMessages) ).then(()=> this.redirect()).catch(error => {
        toastr.error(error);
        this.setState({saving: false});
    });
  }

  redirect(){
    if (this.state.saving == true) {
      browserHistory.push('/login');
    }
  }

  render(){
    return (
        <div><RegistrationForm userDetails={this.state.register} errors={this.state.errors} onChange={this.onChange} onSave={this.onSubmit} saving={this.state.saving}/></div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.object,
  registerUser: PropTypes.func,
  actions: PropTypes.object,
  flashMessages: PropTypes.array
};

function mapStateToProps(state, ownProps){
  let register = {username: "", email: "", password: "", verify_password: "" };
  return {
    register: register,
    flashMessages: state.userActions
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
