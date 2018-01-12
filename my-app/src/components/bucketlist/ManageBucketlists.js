import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bucketlistActions from '../../actions/bucketlistActions';
import Form from './Form';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import _ from 'lodash';

class ManageBucketlists extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      bucketlist: Object.assign({}, props.bucketlist),
      errors: {},
      saving: false,
      title: "Create BucketList"
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

componentWillReceiveProps(nextProps) {
  if (nextProps.bucketlist.id) {
    this.setState({bucketlist: Object.assign({}, nextProps.bucketlist)});
  }
}

onChange(e){
  const field = e.target.name;
  const bucketlist = this.state.bucketlist;
  bucketlist[field] = e.target.value;
  return this.setState({bucketlist});
}

onSave(e){
  e.preventDefault();
  this.setState({saving: true});

  const bucketlistState = this.state.bucketlist;
  let picked = (({title, description})=>({title, description}))(bucketlistState);

  if (bucketlistState.id) {
    this.props.actions.UpdateBucketList(bucketlistState.id, picked).then(() => toastr.success("You have successfully edited a bucketlist")).then(() => this.redirect()).catch(error => {this.handleErrors(error);
  });
  } else {
    this.props.actions.CreateBucketlist(bucketlistState).then(() => toastr.success("You have successfully created a bucketlist")).then(() => this.redirect() ).catch(error => { this.handleErrors(error);
  });
  }
}

onDelete(e){
  e.preventDefault();
  this.setState({saving: true});

  const bucketlistState = this.state.bucketlist;
  let picked = (({title, description})=>({title, description}))(bucketlistState);

  if (bucketlistState.id) {
    this.props.actions.UpdateBucketList(bucketlistState.id, picked).then(() => toastr.success("You have successfully edited a bucketlist")).then(() => this.redirect()).catch(error => {this.handleErrors(error);
  });
  }
}

redirect(){
  if (this.state.saving == true) {
    browserHistory.push('/bucketlists');
  }
}

handleErrors(error){
  toastr.error(error);
  this.setState({saving:false});
}
  render(){
    return(
      <div>
      <Form bucketlist={this.state.bucketlist} onChange={this.onChange} saving={this.state.saving} errors={this.state.errors} onSave={this.onSave} onDelete={this.onDelete} title={this.state.title}/>
      </div>
    );
  }
}

ManageBucketlists.propTypes = {
  bucketlist: PropTypes.object,
  actions: PropTypes.object
};

ManageBucketlists.contextTypes = {
  router: PropTypes.object
};


function getBucketlistId(bucketlists, Id) {
  const bucketlist = bucketlists.filter(bucketlist => bucketlist.list_id == Id);
  if (bucketlist) {
    return ({id: bucketlist[0].list_id, title: bucketlist[0].list_title, description: bucketlist[0].list_description});
  }
  return null;
}

function mapStateToProps(state, ownProps){
  let bucketlist = {title: "",description: "" };
  let bucketlistId = ownProps.params.id;


  if(bucketlistId && state.bucketlist.length >0){
    bucketlist = getBucketlistId(state.bucketlist, bucketlistId);
  }

  return{
    bucketlist: bucketlist
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(bucketlistActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBucketlists);
