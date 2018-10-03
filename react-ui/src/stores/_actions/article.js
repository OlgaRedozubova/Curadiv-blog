import { articleService } from '../_services/article.service';
import C from '../constants';
import axios from "axios/index";

export const articleActions = {
    fetchArticles,
    selectArticle,
};

//ActionsCreators

export function selectArticle (article){
   return {
       type: C.SELECT_ARTICLE,
       payload: { article }
   }
}

//NEW_ARTICLE
export function newArticle (article) {
    return {
        type: C.NEW_ARTICLE,
        payload: { article }
    }
}

export function addSelectArticles (article){
    return {
        type: C.ADD_SELECT_ARTICLES,
        payload: { article }
    }
};

export function delSelectArticles (id){
    return {
        type: C.DEL_SELECT_ARTICLES,
        payload: { id }
    }
};

export function clearSelectArticles (){
    return {
        type: C.CLEAR_SELECT_ARTICLES,
    }
};

export function clearArticle () {
    return {
        type: C.CLEAR_ARTICLE,
    }

}

//-----------------------------------------------------
function request(action_type){
    return {type: action_type}
}

function success(data, action_type){
    return {
        type: action_type,
        payload: { data }
    }
}

function failure (error, action_type){
    return {
        type: action_type,
        payload: { error }
    }
}

export function fetchArticles() {
    return (dispatch) => {
        dispatch(request(C.FETCH_ARTICLES_BEGIN));
        return articleService.getAll()
            .then(json => {
                dispatch(success(json, C.FETCH_ARTICLES_SUCCESS));
                return json;
            })
            .catch(error => {
                dispatch(failure(error, C.FETCH_ARTICLES_FAILURE))
                return error
            });
    };
}

export function fetchAdminArticles() {
    return (dispatch) => {
        dispatch(request(C.FETCH_ADMIN_ARTICLES_BEGIN));
        return articleService.getAdminArticles()
            .then(res => {
                dispatch(success(res, C.FETCH_ADMIN_ARTICLES_SUCCESS));
                return res;
            })
            .catch(error => {
                dispatch(failure(error, C.FETCH_ADMIN_ARTICLES_FAILURE));
                return error
            });
    };
}
//----------------------------------------------------------------------------------------------------------------------
//ADD_ARCHIVE_BEGIN
export function addArchive(list) {
    return (dispatch) => {
        dispatch(request(C.ADD_ARCHIVE_BEGIN));
        if (list) {
            return axios.post('/api/admin/articles', {list, type:'archive'})
                .then(res => {
                    dispatch(success(res.data, C.ADD_ARCHIVE_SUCCESS));
                    return res.data;
                })
                .catch(error => {
                    dispatch(failure(error, C.ADD_ARCHIVE_FAILURE));
                    return error
                })
        }
    };
}

//deleteArticles
export function deleteArticles(list) {
    return (dispatch) => {
        dispatch(request(C.DEL_ARTICLE_BEGIN));
        if (list) {
            return axios.post('/api/admin/articles', {list, type:'delete'})
                .then(res => {
                    dispatch(success(res.data, C.DEL_ARTICLE_SUCCESS));
                    return res.data;
                })
                .catch(error => {
                    dispatch(failure(error, C.DEL_ARTICLE_FAILURE));
                    return error
                })
        }
    };
}


//ADD_ARCHIVE_BEGIN
export function restoreArchive(list) {
    return (dispatch) => {
        dispatch(request(C.RESTORE_ARCHIVE_BEGIN));
        if (list) {
            return axios.post('/api/admin/articles', {list, type:'restore'})
                .then(res => {
                    dispatch(success(res.data, C.RESTORE_ARCHIVE_SUCCESS));
                    return res.data;
                })
                .catch(error => {
                    dispatch(failure(error, C.RESTORE_ARCHIVE_FAILURE));
                    return error
                })
        }
    };
}

export function fetchArticle(id) {
    return (dispatch) => {
        dispatch(request(C.FETCH_ARTICLE_BEGIN));
        return articleService.getArticle(id)
            .then(json => {
                dispatch(success(json, C.FETCH_ARTICLE_SUCCESS));
                return json;
            })
            .catch(error => dispatch(failure(error, C.FETCH_ARTICLE_FAILURE)));
    };
}
//-----------------
export function fetchPodcast(id) {
    return (dispatch) => {
        dispatch(request(C.FETCH_PODCAST_BEGIN));
        return articleService.getPodcast(id)
            .then(json => {
                dispatch(success(json, C.FETCH_PODCAST_SUCCESS));
                return json;
            })
            .catch(error => dispatch(failure(error, C.FETCH_PODCAST_FAILURE)));
    };
}

//------------------
export function editArticle (article) {
    return {
        type: C.EDIT_ARTICLE,
        payload: { article }
    }
}

//ADD_ARCHIVE_BEGIN
export function restore_editArticle(formData) {
    return (dispatch) => {
        dispatch(request(C.EDIT_ARTICLE_BEGIN));
        if (formData) {
            return axios.put('/api/admin/article', formData)
                .then(res => {
                    dispatch(success(res.data, C.EDIT_ARTICLE_SUCCESS));
                    return res.data;
                })
                .catch(error => {
                    dispatch(failure(error, C.EDIT_ARTICLE_FAILURE));
                    return error
                })
        }
    };
}

export function restore_newArticle(formData) {
    return (dispatch) => {
        dispatch(request(C.NEW_ARTICLE_BEGIN));
        if (formData) {
            return axios.post('/api/admin/article', formData)
                .then(res => {
                    dispatch(success(res.data, C.NEW_ARTICLE_SUCCESS));
                    return res.data;
                })
                .catch(error => {
                    dispatch(failure(error, C.NEW_ARTICLE_FAILURE));
                    return error
                })
        }
    };
}


export function restore_editPodcast(formData) {
    return (dispatch) => {
        dispatch(request(C.EDIT_PODCAST_BEGIN));
        if (formData) {
            return axios.put('/api/admin/podcast', formData)
                .then(res => {
                    dispatch(success(res.data, C.EDIT_PODCAST_SUCCESS));
                    return res.data;
                })
                .catch(error => {
                    dispatch(failure(error, C.EDIT_PODCAST_FAILURE));
                    return error
                })
        }
    };
}

export function restore_newPodcast(formData) {
    return (dispatch) => {
        dispatch(request(C.NEW_PODCAST_BEGIN));
        if (formData) {
            return axios.post('/api/admin/podcast', formData)
                .then(res => {
                    dispatch(success(res.data, C.NEW_PODCAST_SUCCESS));
                    return res.data;
                })
                .catch(error => {
                    dispatch(failure(error, C.NEW_PODCAST_FAILURE));
                    return error
                })
        }
    };
}

export function editPodcast (podcast) {
    return {
        type: C.EDIT_PODCAST,
        payload: { podcast }
    }
}