import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bucketlistReducer(state = initialState.bucketlist, action) {
  switch (action.type) {
    case types.CREATE_BUCKETLIST_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.newBucketlist.new_bucketlist)
      ];
    case types.DISPLAY_BUCKETLIST_SUCCESS:
      return action.bucketlists;

    case types.UPDATE_BUCKETLIST_SUCCESS:
      return [
        ...state.filter(bucketlist => bucketlist.list_id !== action.bucketlist.list_id),
        Object.assign({}, action.bucketlist)
      ];
    case types.DELETE_BUCKETLIST_SUCCESS:
      return[
        ...state.filter(bucketlist => bucketlist.list_id !== action.bucketlist.list_id),
        Object.assign({}, action.bucketlist)
      ];
    default:
      return state;
  }
}
