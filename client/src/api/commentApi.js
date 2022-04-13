const { default: axiosClient } = require("./clientAxios");

const commentApi = {
    getCommentMovie: ({movieId, currentPage}) => {
        const url = `api/comments/${movieId}?page=${currentPage}&pageSize=30`;
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