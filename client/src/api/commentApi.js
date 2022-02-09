const { default: axiosClient } = require("./clientAxios");

const commentApi = {
    getCommentMovie: (movieId) => {
        const url = `api/comments/${movieId}`;
        return axiosClient.get(url);
    },
    addComments: (data) => {
        const url = `api/comments/create`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    addFeedbackComments: (data) => {
        const url = `api/comments/create-feedback-comments`;
        return axiosClient.post(url, JSON.stringify(data));
    },
}

export default commentApi;