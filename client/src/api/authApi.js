const { default: axiosClient } = require("./clientAxios");

const authApi = {
    registerAccount: (data) => {
        const url = `auth/new-account`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    refreshToken: (data) => {
        const url = `auth/refresh-token`;
        return axiosClient.post(url, JSON.stringify(data));
    },
}

export default authApi;