// third-party
import { combineReducers } from 'redux';

// project import
import user from './user';
import loaders from './loaders';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ user, loaders });

export default reducers;
