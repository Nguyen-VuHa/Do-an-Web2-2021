const { default: axiosClient } = require("./clientAxios");

const cinemaApi = {
    getAllArea: () => {
        const url = `api/all-area`;
        return axiosClient.get(url);
    },
    newDistrict: (data) => {
        const url = `api/new-area`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    getAllDistrict: () => {
        const url = `api/all-district`;
        return axiosClient.get(url);
    }
}

export default cinemaApi;