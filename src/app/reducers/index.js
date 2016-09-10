import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import socket from './socket';
import monitor from './monitor';
import notification from './notification';
import instances from './instances';

const rootReducer = combineReducers({
  routing,
  socket,
  monitor,
  instances,
  notification
});


export default rootReducer;
