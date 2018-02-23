import { OPERATIONS } from './constants';

const initialState = {
  list: [],
  statistic: []
};

export default function(state = initialState, action){

  switch (action.type) {
        case OPERATIONS.SET:
            return {...state, list: action.payload };
        case OPERATIONS.STATISTIC:
            return {...state, statistic: action.payload };
        default:
            return state;
    }
}