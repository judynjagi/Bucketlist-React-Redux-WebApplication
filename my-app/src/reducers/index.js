import {combineReducers} from 'redux';
import userActions from './userAuthenticationReducer';
import bucketlist from './bucketlistReducer';
import bucketlistSuccess from './sucessReducer';
import bucketlistItems from './bucketlistitemsReducer';


const rootReducer = combineReducers({
  userActions,
  bucketlist,
  bucketlistSuccess,
  bucketlistItems
  // ajaxCallsInProgress
   //short hand property name
});

export default rootReducer;
