import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.register, action) {
  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:
      return [
        action.userRegistrationDetails
      ];
    case types.LOGIN_USER_SUCCESS:
    return [
      ...state,
      action.userLoginDetails
    ];
    // case types.REGISTER_USER_FAILURE:
    //   return[
    //     ...state,
    //     Object.assign({}, action.error)
    //   ];
    default:
      return state;
  }
}

// export default function courseReducer(state = [], action) {
//   switch (action.type) {
//     case types.CREATE_COURSE:
//       return [...state,
//         Object.assign({}, action.course)
//       ];
//     default:
//       return state;
//   }
// }
