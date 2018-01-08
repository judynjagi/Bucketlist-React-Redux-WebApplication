import React, {PropTypes} from 'react';
import ItemForm from './ItemForm';
import Form from './Form';
import {connect} from 'react-redux';
import * as bucketlistitemsactions from '../../actions/bucketlistitemsActions.js';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

class ManageBucketlistsItems extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      bucketlistitems: Object.assign({}, props.bucketlistitems),
      errors: {},
      saving: false,
      title: 'Add Item'
    };
    this.saveBucketlistItems = this.saveBucketlistItems.bind(this);
    this.updateBucketlistItmes = this.updateBucketlistItmes.bind(this);
    // this.editForm = this.editForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bucketlistitems.id) {
      this.setState({bucketlistitems: Object.assign({}, nextProps.bucketlistitems)});
    }
  }

  saveBucketlistItems(e){
    e.preventDefault();
    const itemState = this.state.bucketlistitems;
    let picked = (({title, description})=>({title, description}))(itemState);

    if (itemState.id) {
      // this.setState({title: 'Edit Item'});
      this.props.actions.UpdateBucketlistItems(this.props.bucketlist_id, picked,itemState.id ).then(() => this.redirectOnSave());
    } else {
      this.props.actions.CreateBucketlistItems(this.props.bucketlist_id, itemState).then(() => this.redirectOnSave());
    }
  }


  redirectOnSave(){
    browserHistory.push('/allitems/' + this.props.bucketlist_id);
  }

  updateBucketlistItmes(e){
    e.preventDefault();
    const field = e.target.name;
    const bucketlistitems = this.state.bucketlistitems;
    bucketlistitems[field] = e.target.value;
    return this.setState({bucketlistitems});
  }

  render(){
    const itemId = this.state.bucketlistitems;
    let editForm;
    if (itemId.id) {
      editForm = <ItemForm bucketlist={this.state.bucketlistitems} onSave={this.saveBucketlistItems} onChange={this.updateBucketlistItmes} saving={this.state.false} errors={this.state.errors} />;
    } else {
      editForm = <Form bucketlist={this.state.bucketlistitems} onSave={this.saveBucketlistItems} onChange={this.updateBucketlistItmes} saving={this.state.false} errors={this.state.errors} title={this.state.title}/>;
    }

    return(
      <div>
        {editForm}
      </div>
    );
  }
}
ManageBucketlistsItems.propTypes = {
  bucketlistitems: PropTypes.object,
  actions: PropTypes.object,
  bucketlist_id: PropTypes.number,
  items: PropTypes.object
};

function getListById(bucketlist, Id){
  let list = bucketlist.filter(b => b.list_id == Id);
  if (list) {
    return list[0].list_id;
  }
}

function getItemById(bucketlists, listId, itemId){
  let bucketlistitems;
  let items = bucketlists.filter(lists => lists.list_id == listId);
  if (items) {
    let bucketlists = items.map(bucketlist => bucketlist.items.filter(items => items.item_id == itemId));
    for (let items of bucketlists) {
      return bucketlistitems = {id: items[0].item_id,  title: items[0].item_title, description: items[0].item_description, done:items[0].done};
    }
  }
}

function mapStateToProps(state, ownProps){
  let bucketlistitems = {title: "", description:""};
  let list_Id = ownProps.params.id;
  let item_Id = ownProps.params.item_id;
  let bucketlist_id;
  let items;


  if (list_Id && state.bucketlist.length >0) {
    bucketlist_id = getListById(state.bucketlist, list_Id);
  }

  if (item_Id && state.bucketlist.length >0) {
    bucketlistitems = getItemById(state.bucketlist, list_Id, item_Id);
  }

  return {
    bucketlistitems: bucketlistitems,
    bucketlist_id: bucketlist_id,
    items: items

  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(bucketlistitemsactions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBucketlistsItems);
