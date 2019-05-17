import {SET_USERNAME_TYPE, REMOVE_USERNAME_TYPE} from '../actions'

export default function userName(state = null, action) {
    switch (action.type) {
        case SET_USERNAME_TYPE:
            state = action.name
            return action.name
        case REMOVE_USERNAME_TYPE:
            state = null
            return null
        default:
            return state
    }
}