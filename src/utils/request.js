import axios from 'axios';
import { Message } from 'element-ui';
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    
    baseURL: 'http://zhenhang.test.thingcom.com', //请求路径
    // baseURL: 'http://112.16.67.72:8006',
    // baseURL: 'http://192.168.110.24:12004',
    // baseURL:  'http://139.9.7.204.61:7002',
    // baseURL: 'http://172.16.1.100:7001', //请求路径
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
