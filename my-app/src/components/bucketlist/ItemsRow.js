import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import Collapsible from 'react-collapsible';

const ItemRow = ({items}) => {
  let bucketlistitems = items;

  return(
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <div className="card-header card-primary-fill">
            <p>{bucketlistitems.item_title}</p>
          </div>
          <div className="list">
            <p>
              <span className="headers">Item Description</span>
            <span>{bucketlistitems.item_description}</span>
            </p>
            <p>
              <span className="headers">Done</span>
            <span>{String(bucketlistitems.done)}</span>
            </p>
            <p>
              <span className="headers">Date Created</span>
              <span>{bucketlistitems.date_created}</span>
            </p>
            <p>
              <span className="headers">Date Modified</span>
              <span>{bucketlistitems.date_modified}</span>
            </p>
          </div>
          <div>
            <div className="col-lg-6"><Link to={'/bucketlist/' + bucketlistitems.bucketlist_id +'/items/' + bucketlistitems.item_id}>Edit</Link></div>
          <div className="col-lg-6"><Link to={'/bucketlist/' + bucketlistitems.bucketlist_id +'/items/' + bucketlistitems.item_id}>Delete</Link></div>
          </div>
        </div>
      </div>
    </div>
  ) ;
};

ItemRow.propTypes = {
  items: PropTypes.object.isRequired,
  listId: PropTypes.number.isRequired
};

export default ItemRow;
