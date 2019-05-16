import {applyMiddleware, compose, createStore} from 'redux'
import rootReducer from './reducers'
import {SET_USERNAME_TYPE} from './actions'
import {getUserName} from './tools'


// const loggerMiddleware = store => next => action => {
//     console.group(action.type)
//     console.info('dispatching', action)
//     let result = next(action)
//     console.log('next state', store.getState())
//     console.groupEnd()
//     return result
// }

export default function configureStore(preloadedState) {
    // const middlewares = [loggerMiddleware]
    const middlewares = []
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = compose(...enhancers)

    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    store.dispatch({
        type: SET_USERNAME_TYPE,
        name: getUserName()
    })

    return store
}