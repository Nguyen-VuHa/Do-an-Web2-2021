const { default: axiosClient } = require("./clientAxios");

const bookingApi = { 
    createNewHistoryBookingApi: (data) => {
        const url = `api/history-booking/create`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    createNewHistoryTicketApi: (data) => {
        const url = `api/history-ticket/create`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    sendMailBookingSuccess: (data) => {
        const url = `api/send-mail-booking`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    
}

export default bookingApi;