import { combineReducers } from 'redux';
import songs from './songReducer';
import playState from './playStateReducer';
const reducers = combineReducers({
  songs,
  playState,
});

export default reducers;
