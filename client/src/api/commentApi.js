const { default: axiosClient } = require("./clientAxios");

const commentApi = {
    getCommentMovie: (movieId) => {
        const url = `api/comments/${movieId}`;
        return axiosClient.get(url);
    },
    addComments: (data) => {
        const url = `api/add-comments`;
        return axiosClient.post(url,JSON.stringify(data));
    },
}

export default commentApi;