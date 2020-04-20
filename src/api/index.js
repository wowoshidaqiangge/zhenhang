import request from '../utils/request';

export const Login = query => {
    return request({
      url: '/api/user/login',
      data:query,
      method: 'post'
    })
  }
export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};


