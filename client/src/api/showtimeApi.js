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
}

export default showtimeApi;