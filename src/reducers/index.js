import {combineReducers} from 'redux';
import app from './appReducer';
import haha from './hahaR';

const appReducer = combineReducers({
	app,
	haha,
});
export default appReducer;
