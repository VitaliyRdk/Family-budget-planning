import { combineReducers } from 'redux'
import loader from './loader';
import user from './user';
import operations from './operations';

export default combineReducers({
  loader,
  user,
  operations
})