import axios from 'axios';

const httpsRequest = axios.create({
    baseURL: 'http://localhost/5000',
    withCredentials: true,
});

const token = localStorage.getItem('token');

httpsRequest.interceptors.request.use(
    (config) => {
        config.headers.Authorization = token;
        return config;
    },
    (error) => Promise.reject(error),
);
export const get = async (path, config = {}) => {
    const response = await httpsRequest.get(path, config);
    return response;
};

export const post = async (path, config = {}) => {
    const response = await httpsRequest.post(path, config);
    return response;
};
export const put = async (path, config = {}) => {
    const response = await httpsRequest.put(path, config);
    return response;
};
export const del = async (path, config = {}) => {
    const response = await httpsRequest.delete(path, config);
    return response;
};

export default httpsRequest;
