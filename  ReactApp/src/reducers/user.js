import { USER } from './constants';

const initialState = {
    access_token: null,
    data: {

    }
  };
  
  export default function(state = initialState, action){
  
    switch (action.type) {
      case USER.SET_USER_TOKEN:
        return { ...state, access_token: action.payload }
      case USER.SET:
        return {...state, data: action.payload };
      default:
        return state;
    }
  
  }