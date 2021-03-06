import C from '../constants';

//reducers
export const article = (state = {}, action) => {
    switch (action.type) {
        case C.FETCH_ARTICLE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case C.FETCH_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.article
            };
        case C.FETCH_ARTICLE_FAILURE:
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

export default article;