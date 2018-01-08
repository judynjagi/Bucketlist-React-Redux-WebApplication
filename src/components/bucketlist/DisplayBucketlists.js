import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bucketlistActions from '../../actions/bucketlistActions';
import BucketList from './BucketList';
import {browserHistory} from 'react-router';

class DisplayBucketlists extends React.Component{
  constructor(props, context){
    super(props, context);

    this.redirect = this.redirect.bind(this);
    this.onClick = this.onClick.bind(this);

  }

onClick(listId){
  this.props.actions.DeleteBucketList(listId);
}

redirect(){
  browserHistory.push('/bucketlist');
}

  render(){
    // const {items} = this.props
    return(
      <div>
        <input type="submit" value="Add Bucketlist" className="btn btn-primary" onClick={this.redirect}/>
      <BucketList
        allBucketlists={this.props.bucketlists}
        onClick={this.onClick}/>
      {/* {console.log(this.props.bucketlists)} */}
      </div>
    );
  }
}

DisplayBucketlists.propTypes = {
  bucketlists: PropTypes.array,
  actions: PropTypes.object
};

function mapStateToProps(state, ownProps){
  return{
    bucketlists: state.bucketlist
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(bucketlistActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayBucketlists);
