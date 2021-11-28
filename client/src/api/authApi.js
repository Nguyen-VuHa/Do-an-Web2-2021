const { default: axiosClient } = require("./clientAxios");

const authApi = {
    getInfoUser: (refreshToken) => {
        const url = `auth/get-info-user?refreshToken=${refreshToken}`;
        return axiosClient.get(url);
    },
    registerAccount: (data) => {
        const url = `auth/new-account`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    loginAccount: (data) => {
        const url = `auth/login-account`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    refreshToken: (data) => {
        const url = `auth/refresh-token`;
        return axiosClient.post(url, JSON.stringify(data));
    },
}

export default authApi;