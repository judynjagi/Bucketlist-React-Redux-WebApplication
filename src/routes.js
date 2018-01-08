import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Register from './components/home/Registration';
import Login from './components/home/Login';
import ManageBucketlist from './components/bucketlist/ManageBucketlists';
import DisplayBucketlists from './components/bucketlist/DisplayBucketlists';
import DisplayItems from './components/bucketlist/DisplayItems';

import ManageBucketlistsItems from './components/bucketlist/ManageBucketlistItems';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Register} />
    <Route path="login" component={Login} />
    <Route path="bucketlist" component={ManageBucketlist} />
    <Route path="bucketlist/:id" component={ManageBucketlist} />
  <Route path="bucketlists" component={DisplayBucketlists} />
    <Route path="allitems/:id" component={DisplayItems} />
    <Route path="bucketlist/:id/items/" component={ManageBucketlistsItems} />
    <Route path="bucketlist/:id/items/:item_id" component={ManageBucketlistsItems} />
  </Route>
);
