const { default: axiosClient } = require("./clientAxios");

const movieApi = {
    newMovie: (data) => {
        const url = `api/new-movie`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    updateMovie: (data, movieId) => {
        const url = `api/movie/${movieId}/update`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    getAllMovie: () => {
        const url = `api/movie`;
        return axiosClient.get(url);
    },
    getPosterById: (movieId) => {
        const url = `api/movie-poster/${movieId}/update`;
        return axiosClient.get(url);
    },
    getDataFormById: (movieId) => {
        const url = `api/movie-data/${movieId}/update`;
        return axiosClient.get(url);
    },
}

export default movieApi;