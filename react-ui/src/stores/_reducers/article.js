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
        case C.FETCH_PODCAST_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case C.FETCH_PODCAST_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.podcast
            };
        case C.FETCH_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        case C.SELECT_ARTICLE:
            return {
                ...state,
                loading: false,
                items: action.payload.article,
            };
        case C.CLEAR_ARTICLE :
            return {};

        case C.EDIT_ARTICLE:
            return {
                ...state,
                loading: false,
                items: action.payload.article,
            };
        ///-----------------
        case C.EDIT_ARTICLE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case C.EDIT_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.article
            };
        case C.EDIT_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        case C.EDIT_PODCAST_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case C.EDIT_PODCAST_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.article
            };
        case C.EDIT_PODCAST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        //------------------
        //------------------
        case C.EDIT_PODCAST:
            return {
                ...state,
                loading: false,
                items: action.payload.podcast,
            };
        case C.NEW_ARTICLE:
            return {
                ...state,
                loading: false,
                items: {},
            };
        default:
            return state
    }
};

export default article;