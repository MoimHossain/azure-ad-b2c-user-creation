

import axios from 'axios';
import AuthService from './authorizationService';

class Backend {
    create = () => {
        let axiosInstance = axios.create();
        // set the base URI
        // axiosInstance.defaults.baseURL = "/";
        axiosInstance.interceptors.request.use((config) => new Promise((resolve) => {
            const authService = new AuthService();
            authService
                .getToken()
                .then(token => {
                    config.headers.common['Authorization'] = `Bearer ${token}`;
                    resolve(config);
                }, error => {
                    console.error("GetAccessToken: " + config.method.toUpperCase() + " " + config.baseURL + config.url, error);
                });
        }));

        return axiosInstance;
    }

    createUser = (user) => {
        const api = this.create();
        return api.post('/api/user/create', user);
    }
    getProjects = (searchkey) => {
        const api = this.create();
        return api.get('/api/user/search/' + searchkey);
    }
}

export default new Backend();