import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bucketlistSucessReducer(state = initialState.sucessMessages, action) {
  switch (action.type) {
    case types.CREATE_BUCKETLIST_SUCCESS:
      return action.newBucketlist;
    default:
      return state;
  }
}
