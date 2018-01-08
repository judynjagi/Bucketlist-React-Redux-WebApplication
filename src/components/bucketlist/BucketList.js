import React, {PropTypes} from 'react';
import BucketlistRow from './BucketlistRow';

const Bucketlist = ({allBucketlists, onClick}) => {
  return(
    <div className="row">
        {allBucketlists.map(singleBucketlist =>
        <BucketlistRow key={singleBucketlist.list_id} bucketlist={singleBucketlist} onClick={onClick}/>
        )}
    </div>
  );
};

Bucketlist .propTypes = {
  allBucketlists: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Bucketlist ;
