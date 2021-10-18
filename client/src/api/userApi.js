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
}

export default userApi;