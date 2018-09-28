import C from '../constants';

//reducers
export const articles = (state = {}, action) => {
    switch (action.type) {
        case C.FETCH_ARTICLES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case C.FETCH_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.articles
            };
        case C.FETCH_ARTICLES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        default:
            return state
    }
};


export default articles;