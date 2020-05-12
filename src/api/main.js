
import request from '../utils/request';


//设备档案列表
export const devicepage = query => {
    return request({
        url: `/api/device/page`,
        method: 'get',
        params:query
    });
  }

 // 设备所属类型
 export const deviceToTypeList = query => {
    return request({
        url: `/api/device/deviceToTypeList`,
        method: 'get',
        params:query
    });
  }

  //新增设备
  export const devicesave = query => {
    return request({
        url: `/api/device/save`,
        method: 'post',
        data:query,
     
    });
  }

 //查看设备详情
 export const deviceid = query => {
    return request({
        url: `/api/device/${query.id}`,
        method: 'get',
        params:query
    });
  }

  // 设备报废和启用
  export const updateState = query => {
    return request({
        url: `/api/device/updateState`,
        method: 'put',
        data:query,
        // dataType:'json',
       
    });
  }
  