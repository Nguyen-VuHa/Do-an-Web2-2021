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
    updateImageUser: (accessToken, dataBase64) => {
        let data = dataBase64;
        const url = `api/image/82fcfba6-1d63-443a-b7b9-d10b9941f3c6`;
        return axiosClient.post(url,  {data: data} , {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            }
        });
    },
    getAllImageUser: (accessToken) => {
        const url = `api/get-image/f3cbabb5-c184-431e-b5b7-e48a4f17cb06`;
        return axiosClient.get(url , {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
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
    saveAvartarUser: (accessToken, objData) => {
        const url = `api/avartar/f0fa6ed4-3b4a-4e69-8a27-2063055e27a6`;
        return axiosClient.post(url, { data: objData },{
            headers: {
                'Authorization':`Bearer ${accessToken}` 
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