import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bucketlistActions from '../../actions/bucketlistActions';
import ItemList from './ItemsList';
import {browserHistory} from 'react-router';

class DisplayItems extends React.Component{
  constructor(props, context){
    super(props, context);

    this.redirect = this.redirect.bind(this);

  }

getItemBody(bucketlist, Id){
  if (bucketlist.length>0) {
    const list = bucketlist.filter(list => list.list_id == Id);
    if (list) {
      return list[0].items;
    }
  }
  return [];
}

redirect(){
  browserHistory.push('/bucketlist');
}

  render(){
    return(
      <div>
        <input type="submit" value="Add Course" className="btn btn-primary" onClick={this.redirect}/>
      <ItemList allItems={this.getItemBody(this.props.bucketlist, this.props.params.id)}/>
      </div>
    );
  }
}

DisplayItems.propTypes = {
  bucketlist: PropTypes.array,
  list: PropTypes.number,
  actions: PropTypes.object,
  params: PropTypes.object
};

// function getListId(bucketlist){
//   let list = bucketlist.map(list => list.list_id );
//   return list;
// }
//
// function getAllItems(bucketlists,Id){
//   let items;
//   let item = bucketlists.filter(lists => lists.list_id == Id);
//   if (item) {
//     let bucketlists = item.map(bucketlist => bucketlist.items);
//     for (let items of bucketlists) {
//       return items;
//     }
//   }
//   return [];
// }

function mapStateToProps(state, ownProps){
  return{
    bucketlist: state.bucketlist
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(bucketlistActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayItems);
