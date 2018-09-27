import { articleService } from '../_services/article.service';
import C from '../constants';

export const articleActions = {
    fetchArticles,
    selectArticle,
};

//ActionsCreators

export function selectArticle (article){
   alert("Now is article: " + article.title);
   return {
       type: C.SELECT_ARTICLE,
       payload: { article }
   }
};
//-----------------------------------------------------
function request(){
    return {type: C.FETCH_ARTICLES_BEGIN}
}

function success(articles){
    return {
        type: C.FETCH_ARTICLES_SUCCESS,
        payload: { articles }
    }
}

function failure (error){
    return {
        type: C.FETCH_ARTICLES_FAILURE,
        payload: { error }
    }
}

export function fetchArticles() {
    return (dispatch) => {
        dispatch(request());
        return articleService.getAll()
            .then(json => {
                console.log('json => ', json);
                dispatch(success(json));
                return json;
            })
            .catch(error => dispatch(failure(error)));
    };
}

export function fetchArticle(id) {
    return (dispatch) => {
        dispatch(requestArticle());
        return articleService.getArticle(id)
            .then(json => {
                console.log('json => ', json);
                dispatch(successArticle(json));
                return json;
            })
            .catch(error => dispatch(failureArticle(error)));
    };
}

function requestArticle(){
    return {type: C.FETCH_ARTICLE_BEGIN}
}

function successArticle(article){
    return {
        type: C.FETCH_ARTICLE_SUCCESS,
        payload: { article }
    }
}

function failureArticle (error){
    return {
        type: C.FETCH_ARTICLE_FAILURE,
        payload: { error }
    }
}