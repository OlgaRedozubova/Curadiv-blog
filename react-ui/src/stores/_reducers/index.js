import { combineReducers } from 'redux';

import configure from './configure';
import auth from './auth';
import users from './users';
import sort from './sort';
import articles from './articles';


const stores = combineReducers({
    articles,
    configure,
    auth,
    users,
    sort,
    // invite,
    // UiStore,
    // UserStore,
    // users,
    // friends,
    // contacts,
});

export default stores;