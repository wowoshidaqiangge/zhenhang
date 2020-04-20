import axios from 'axios';
import { Message } from 'element-ui';
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    
    // baseURL: 'http://114.55.67.62:8003', //请求路径
    timeout: 10000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Message.error(response.data.error);
           return Promise.reject();
        }
    },
    error => {
        return Promise.reject();
    }
);

export default service;
