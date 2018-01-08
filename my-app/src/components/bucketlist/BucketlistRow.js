import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import Collapsible from 'react-collapsible';

const BucketlistRow = ({bucketlist,onClick}) =>{
  const bucketlists = bucketlist;

  let bucketlistitems = "";
  bucketlists.items.map(item => {
    bucketlistitems = item;
  });

  return(
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <div className="card-header card-primary-fill">
            <p>{bucketlists.list_title}</p>
          </div>
        </div>
        <div className="list">

        </div>
        <p>
          <span className="headers">Description </span>
          <span>{bucketlists.list_description}</span>
        </p>
        <p>
          <span className="headers">Date Created</span>
          <span>{bucketlists.date_created}</span>
        </p>
        <p>
          <span className="headers">Date Modified</span>
          <span>{bucketlists.date_modified}</span>
        </p>
        <div ><Link to={'/allitems/' + bucketlists.list_id}>View Bucketlist Items</Link></div>
        <div>
            <div className="col-lg-4"><Link to={'/bucketlist/' + bucketlists.list_id}>Edit</Link></div>
            {/* <div className="col-lg-4 button"><input type="submit" value="Delete" className="btn" onClick={() => { onClick(bucketlists.list_id);}}/></div> */}
            <div className="col-lg-4"><Link to={'/bucketlist/' + bucketlists.list_id + '/items/'}> Add item</Link></div>
        </div>
      </div>
    </div>
  ) ;
};

BucketlistRow.propTypes = {
  bucketlist: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired

};

export default BucketlistRow;
