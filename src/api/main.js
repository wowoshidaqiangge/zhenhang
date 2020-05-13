
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

// 修改
export const deviceupdate = query => {
  return request({
      url: `/api/device/update`,
      data:query,
      method: 'put',
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
        data:query,
        method: 'put',
    });
  }
  

  // 删除设备
  export const devicedelete = query => {
    return request({
        url: `/api/device/${query.id}`,
        method: 'delete',
        params:query
    });
  }
  
// 根据设备类型查询设备编号
export const getListByToType = query => {
  return request({
      url: `/api/device/getListByToType`,
      method: 'get',
      params:query
  });
}


  //保养计划
  export const maintenancepage = query => {
    return request({
        url: `/api/maintain/maintenance/page`,
        method: 'get',
        params:query
    });
  }
  
  // 新增保养计划
  export const maintenanceadd = query => {
    return request({
        url: `/api/maintain/maintenance`,
        method: 'post',
        data:query,
     
    });
  }
  
  // 查看保养计划详情
  export const maintenanceid = query => {
    return request({
        url: `/api/maintain/maintenance/${query.id}`,
        method: 'get',
        params:query
    });
  }

  //修改
  export const maintenanceput = query => {
    return request({
        url: `/api/maintain/maintenance`,
        data:query,
        method: 'put',
    });
  }
  // 删除
  export const maintenancedelete = query => {
    return request({
        url: `/api/maintain/maintenance/${query.id}`,
        data:query,
        method: 'delete',
    });
  }

 