import { articleService } from '../_services/article.service';
import C from '../constants';

export const articleActions = {
    fetchArticles,
    onRemoveArticle,
    onEditArticle
};


function onRemoveArticle(list) {
    //dispatch(removeArticle(id))
}

function onEditArticle(id) {
     //   dispatch(editArticle(id));

    //function
}

function fetchArticles() {
    return dispatch => {
        dispatch(request());
        return articleService.getAll()
            .then(json => {
                console.log('json => ', json);
                dispatch(success(json));
                return json;
            })
            .catch(error => dispatch(failure(error)));
    };
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
}