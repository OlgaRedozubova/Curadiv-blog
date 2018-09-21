import C from '../constants';

const article = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_ARTICLE:
            return {
                id: action.id,
                title: action.title,
                subTitle: action.subTitle,
                author: action.author,
                imgSplash: action.imgSplash,
                img1: action.img1,
                img2: action.img2,
                slot: action.slash,
                body: action.body,
            };
        case C.EDIT_ARTICLE:
            return (state.id !== action.id) ?
                state :
                {
                    ...state,
                    title: action.title,
                    subTitle: action.subTitle,
                    author: action.author,
                    imgSplash: action.imgSplash,
                    img1: action.img1,
                    img2: action.img2,
                    slot: action.slash,
                    body: action.body,
                    //rating: action.rating
                };
        default :
            return state
    }
};

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

//---------------------------------
        case C.GETALL_REQUEST:
            return {
                item: action.articles,

            };
        case C.GETALL_SUCCESS:
            return {
                items: action.articles
            };
        case C.GETALL_FAILURE:
            return {
                error: action.error
            };

        case  C.ADD_ARTICLE :
            return [
                ...state,
                article({}, action)
            ];
        case C.EDIT_ARTICLE :
            return state.map(
                c => article(c, action)
            );
        case C.DEL_ARTICLE :
            return state.filter(
                c => c.id !== action.id
            );
        default:
            return state
    }
};



export const deleteArticle = id => ({
    type: C.DEL_ARTICLE,
    id
});

export const editArticle = (id, {title, subTitle, author, imgSplash, img1, img2, slot,  body,}) => ({
    type: C.EDIT_ARTICLE,
    id,
    title,
    subTitle,
    author,
    imgSplash,
    img1,
    img2,
    slot,
    body,
});


export default articles;