import { combineReducers } from 'redux';

import configure from './configure';
import auth from './auth';
import users from './users';
import sort from './sort';
import articles from './articles';
import article from './article';


const stores = combineReducers({
    articles,
    article,
    configure,
    auth,
    users,
    sort,
});

export default stores;