import { SET_USERNAME_TYPE, REMOVE_USERNAME_TYPE } from '../actions';

export default function userName(state = null, action) {
  switch (action.type) {
    case SET_USERNAME_TYPE:
      return action.name;
    case REMOVE_USERNAME_TYPE:
      return null;
    default:
      return state;
  }
}
