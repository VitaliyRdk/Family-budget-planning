import { LOADER } from './constants';

const initialState = {
  showLoader: false,
  calls: 0
};

export default function(state = initialState, action){
  let calls;

  switch (action.type) {
    case LOADER.SHOW_LOADER:
      calls = state.calls + 1;
      return {...state, showLoader: true, calls};
    case LOADER.HIDE_LOADER:
      calls = state.calls - 1;
      return {...state, showLoader: calls === 0 ? false : true, calls};
    default:
      return state;
  }
}