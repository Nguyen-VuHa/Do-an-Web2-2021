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
    getPagination: (page, textSearch) => {
        const url = `api/movie-page?s=${textSearch}&page=${page}`;
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
    //==============
    getMovieHomePage: () => {
        const url = `api/aG9tZXBhZ2U=/c4c60e3e-2d35-46b6-94ce-66a9d16121fe`;
        return axiosClient.get(url);
    },
    getMovieDetail: () => {
        const url = `api/bW92aWU=/bec4a217-4bfb-4da6-b396-659e9949de62`;
        return axiosClient.get(url);
    },
    // client api
    getMovieDetailById: (movieId) => {
        const url = `api/movie/movie-detail/${movieId}`;
        return axiosClient.get(url);
    },
    getMovieCurrentShow: () => {
        const url = `api/movie/movie-current`;
        return axiosClient.get(url);
        
    }
}

export default movieApi;