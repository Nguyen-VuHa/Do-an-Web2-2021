const { default: axiosClient } = require("./clientAxios");

const userApi = {
    getCountNotify: (accessToken) => {
        const url = `api/6698afba-1c21-478d-a519-4b09200586e5`;
        return axiosClient.get(url, {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            }
        });
    },
    listNotify: (accessToken) => {
        const url = `api/109db409-56dd-4829-af16-414df236bd9c`;
        return axiosClient.post(url, {}, {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            }
        });
    },
    getInfoUser: (accessToken) => {
        const url = `api/922a85e5-0aa1-4977-bc26-0af50fe8e50e`;
        return axiosClient.get(url, {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            }
        });
    },
    updateProfile: (accessToken, dataProfile) => {
        const url = `api/user/2d01c471-7573-4bbb-8929-b6be0c346f4f`;
        return axiosClient.post(url, dataProfile, {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            }
        });
    },
}

export default userApi;