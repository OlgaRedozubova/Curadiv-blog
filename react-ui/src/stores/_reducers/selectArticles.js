import C from '../constants';

//reducers
export const selectArticles = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_SELECT_ARTICLES:
            return [
                ...state,
                Object.assign({}, action.payload.article)
            ];
        case C.DEL_SELECT_ARTICLES :
            return state.filter(
                c => c._id !== action.payload.id
            );
        case C.CLEAR_SELECT_ARTICLES :
            return {};
        default:
            return state
    }
};

export default selectArticles;