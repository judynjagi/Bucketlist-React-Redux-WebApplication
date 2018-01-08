import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bucketlistItems(state = initialState.bucketlistitems, action){
  switch (action.type) {
    case types.CREATE_BUCKETLISTITMES_SUCCESS:
      return[
        ...state,
        Object.assign({}, action.item)
      ];
    case types.DISPLAY_BUCKETLISTITEM_SUCCESS:
      return action.items;
    case types.UPDATE_BUCKETLISTITMES_SUCCESS:
      return [
        ...state.filter(item => item.item_id == action.item_id),
        Object.assign({}, action.item)
      ];
    default:
      return state;
  }
}
