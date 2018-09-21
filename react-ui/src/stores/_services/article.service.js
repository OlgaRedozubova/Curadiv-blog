export const articleService = {
    getAll,
    getById,
};

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function getAll(){
    return fetch("/api/articles").then(handleErrors).then(res => res.json());
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        // headers: authHeader()
    };

    return fetch(`/api/articles/${id}`, requestOptions).then(response => response.json());
}
