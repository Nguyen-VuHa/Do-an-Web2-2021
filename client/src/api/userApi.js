import enCodeDataJson from "src/contants/funtionEnCode";
const { default: axiosClient } = require("./clientAxios");

const userApi = {
    getCountNotify: (accessToken) => {
        const url = `api/notification/count-notify`;
        return axiosClient.get(url, {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            }
        });
    },
    getNotifications: (accessToken) => {
        const url = `api/notification/list`;
        return axiosClient.post(url, {}, {
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
    getInfoUser: (payload) => {
        const url = `api/user/infomation/${payload.userId}`;
        
        return axiosClient.get(url, {
            headers: {
                'Authorization':`Bearer ${payload.accessToken}` 
            }
        });
    },
    updateProfile: (accessToken, dataProfile) => {
        const url = `api/user/update-info`;
        return axiosClient.post(url, 
        {
            data: enCodeDataJson(dataProfile),
        }, 
        {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            }
        });
    },
    updateImageUser: (dataBase64) => {
        let data = dataBase64;
        const url = `api/user/update-avartar`;
        return axiosClient.post(url, {data: data} , {
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('accessToken')}` 
            }
        });
    },
    getAllImageUser: () => {
        const url = `api/user/all-image-user`;
        return axiosClient.get(url , {
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('accessToken')}` 
            }
        });
    },
    getAvartarUser: (accessToken) => {
        const url = `api/avartar/efcdbd4f-50f9-4517-abd3-c136c6cf123c`;
        return axiosClient.get(url , {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            }
        });
    },
    saveAvartarUser: (data) => {
        const url = `api/user/change-avartar`;
        return axiosClient.post(url, data ,{
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('accessToken')}` 
            }
        });
    },
    getAllWalletPersonal: () => {
        const url = `api/user/wallet-personal`;
        return axiosClient.get(url,{
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('accessToken')}` 
            }
        });
    },
    createRechargeMoney: (data) => {
        const url = `api/recharge-money/create`;
        return axiosClient.post(url, data, {
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('accessToken')}` 
            }
        });
    },
}

export default userApi;