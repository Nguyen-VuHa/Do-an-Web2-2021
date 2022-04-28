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
}

export default bookingApi;