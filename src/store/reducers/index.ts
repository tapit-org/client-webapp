// third-party
import { combineReducers } from 'redux';

// project import
import user from './user';
import loaders from './loaders';
import cart from './cart';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ user, loaders, cart });

export default reducers;
