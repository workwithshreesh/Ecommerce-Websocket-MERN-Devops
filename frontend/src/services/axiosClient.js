const axios = require('axios');

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true
});

axiosClient.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return token;

}, (error) => {
    Promise.reject(error)
}
);


axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response.status == 401){
            localStorage.removeItem("token");
            window.location.href = "'/login'";
        }

        return Promise.reject(error);
    }
);


export default axiosClient;