import { combineReducers } from 'redux';

import articles from './articles';
import article from './article';
import selectArticles from './selectArticles';


const stores = combineReducers({
    articles,
    article,
    selectArticles
});

export default stores;