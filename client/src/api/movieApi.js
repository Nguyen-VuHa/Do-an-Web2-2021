const { default: axiosClient } = require("./clientAxios");

const movieApi = {
    newMovie: (data) => {
        const url = `api/new-movie`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    getAllMovie: () => {
        const url = `api/movie`;
        return axiosClient.get(url);
    },
}

export default movieApi;