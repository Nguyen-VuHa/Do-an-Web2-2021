const { default: axiosClient } = require("./clientAxios");

const showtimeApi = { 
    createNewShowtime: (data) => {
        const url = `api/showtimes/create`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    fetchAllShowtime: () => {
        const url = `api/all-showtimes`;
        return axiosClient.get(url);
    },
    fetchShowtimesByMovie: (payload) => {
        const url = `api/showtimes-by-movie/${payload}`;
        return axiosClient.get(url);
    },
    fetchShowtimesByCinema: (payload) => {
        const url = `api/showtimes-by-cinema/${payload}`;
        return axiosClient.get(url);
    },
    fetchShowtimesById: (payload) => {
        const url = `api/showtimes/${payload}`;
        return axiosClient.get(url);
    },
}

export default showtimeApi;