import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/userAuthenticationActions';
import LoginForm from './LoginForm';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class Login extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      login: Object.assign({}, this.props.login),
      errors: {},
      saving: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

onChange(e){
  const field = e.target.name;
  const login = this.state.login;
  login[field] = e.target.value;
  return this.setState({login});
}

onSave(e){
  e.preventDefault();
  this.setState({saving: true});
  this.props.actions.loginUsers(this.state.login).then(() => toastr.success(this.props.flashMessages)).then(() => this.redirect()).catch(error =>{
    toastr.error(error);
    this.setState({saving: false});
  });
}

redirect(){
  if (this.state.saving == true) {
    browserHistory.push('/bucketlists');
  }
}

  render(){
    return(
      <div>
      <LoginForm userDetails={this.state.login} onChange={this.onChange} saving={this.state.saving} errors={this.state.errors} onSave={this.onSave}/>

      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.object,
  actions: PropTypes.object,
  flashMessages: PropTypes.array
};

function mapStateToProps(state, ownProps){
  let login = {username: "", password: ""};
  return{
    login:login,
    flashMessages: state.userActions
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
