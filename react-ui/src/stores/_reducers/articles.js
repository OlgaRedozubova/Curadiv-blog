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
                items: action.payload.data.articles,
                podcast: action.payload.data.podcast
            };
        case C.FETCH_ARTICLES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
                podcast: []
            };
//------------------------------------------------------------
        case C.FETCH_ADMIN_ARTICLES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case C.FETCH_ADMIN_ARTICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data.articles,
                archive: action.payload.data.archive,
                archivePodcast: action.payload.data.archivePodcast,
                podcast: action.payload.data.podcast
            };
        case C.FETCH_ADMIN_ARTICLES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
                archive: [],
                archivePodcast: [],
                podcast: []
            };
//--------------------------------------------------------
        case C.ADD_ARCHIVE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case C.ADD_ARCHIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data.articles,
                archive: action.payload.data.archive,
                archivePodcast: action.payload.data.archivePodcast,
                podcast: action.payload.data.podcast
            };
        case C.ADD_ARCHIVE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
                archive: [],
                archivePodcast: [],
                podcast: []

            };
//--------------------------------------------------------
        case C.RESTORE_ARCHIVE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case C.RESTORE_ARCHIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data.articles,
                archive: action.payload.data.archive,
                archivePodcast: action.payload.data.archivePodcast,
                podcast: action.payload.data.podcast
            };
        case C.RESTORE_ARCHIVE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
                archive: [],
                archive: [],
                archivePodcast: [],
                podcast: []
            };
//DEL_ARTICLE
//--------------------------------------------------------
        case C.DEL_ARTICLE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case C.DEL_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.data.articles,
                archive: action.payload.data.archive,
                archivePodcast: action.payload.data.archivePodcast,
                podcast: action.payload.data.podcast
            };
        case C.DEL_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
                archive: [],
                archivePodcast: [],
                podcast: []
            };
//----------------------------------------------------------------------------------------------------------------------

        // case C.ADD_ARCHIVE:
        //     return {
        //         ...state,
        //         loading: false,
        //         items: action.payload.data.articles,
        //         archive: action.payload.data.archive
        //     };
        // case C.DEL_ARCHIVE:
        //     return {
        //         ...state,
        //         loading: false,
        //         items: action.payload.data.articles,
        //         archive: action.payload.data.archive
        //     };
        default:
            return state
    }
};


export default articles;