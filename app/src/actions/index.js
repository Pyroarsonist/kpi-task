export const SET_USERNAME_TYPE = 'SET_USERNAME';
export const REMOVE_USERNAME_TYPE = 'REMOVE_USERNAME';

export const setUsername = name => ({ type: SET_USERNAME_TYPE, name });
export const removeUsername = () => ({ type: REMOVE_USERNAME_TYPE });
