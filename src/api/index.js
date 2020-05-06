import request from '../utils/request';



//关于权限

//登录
export const login = query => {

    return request({
      url: '/api/auth/user/login',
      data:query,
      method: 'post'
    })
}

// 左侧菜单栏

export const userListMenu = query => {
  return request({
      url: `/api/auth/user/listMenu/${query.id}`,
      method: 'get',
  });
}



//  人员管理

// 权限列表

export const roleList = query => {
  return request({
      url: `/api/auth/role/list`,
      method: 'get',
      params:query
  });
}

// 员工管理中树状图
export const deptList = query => {
  return request({
      url: `/api/auth/dept/treeList`,
      method: 'get',
      params:query
  });
}

// 员工列表

export const userPage = query => {
  return request({
      url: `/api/auth/user/page`,
      method: 'get',
      params:query,
     
  });
}


// 角色列表

export const rolePage = query => {
  return request({
      url: `/api/auth/role/page`,
      method: 'get',
      params:query
  });
}

// 部门列表
export const dept = query => {
  return request({
      url: `/api/auth/dept/list`,
      method: 'get',
      params:query,
     
  });
}

//新增用户

export const authUser = query => {
      return request({
        url: '/api/auth/user',
        data:query,
        method: 'post',
        headers: {'userId': localStorage.getItem('userId')}
      })
  }

//查看用户详情

export const authputUserid = query => {
  return request({
      url: `/api/auth/user/${query.id}`,
      method: 'get',
  });
}


//编辑用户

export const authputUser = query => {
       return request({
         url: '/api/auth/user',
         data:query,
         method: 'put',
       })
   }

// 删除用户
export const userDelete = query => {
  return request({
      url: `/api/auth/user/${query.id}`,
      method: 'delete',
  });
}


// 新增角色
export const authrole = query => {
  return request({
    url: '/api/auth/role',
    data:query,
    method: 'post',
    headers: {'userId': localStorage.getItem('userId')}
  })
}

// 查看角色详情
export const authroleid = query => {
  return request({
      url: `/api/auth/role/${query.id}`,
      method: 'get',
  });
}

// 修改角色

export const authputrole = query => {
  return request({
    url: '/api/auth/role',
    data:query,
    method: 'put',
  })
}

// 删除角色
export const roleDelete = query => {
  return request({
      url: `/api/auth/role/${query.id}`,
      method: 'delete',
  });
}


// 设备管理

//设备维保列表
export const planPage = query => {
  return request({
      url: `/api/maintain/plan/page`,
      method: 'get',
      params:query,
      // headers: {'userId': localStorage.getItem('userId')}
  });
}

// 设备维保数据新增

export const maintain = query => {
  return request({
      url: `/api/maintain/plan`,
      data:query,
      method: 'post',
  });
}
// 设备维保数据修改
export const maintainput = query => {
  return request({
    url: '/api/maintain/plan',
    data:query,
    method: 'put',
  })
}

// 设备维保数据删除
export const maintaindelete = query => {
  return request({
      url: `/api/maintain/plan/${query.id}`,
      method: 'delete',
  });
}

// 设备维保数据详情
export const maintainget = query => {
  return request({
      url: `/api/maintain/plan/${query.id}`,
      method: 'get',
  });
}


// 设备维保中维保设备列表
export const deviceList = query => {
  return request({
      url: `/api/device/list`,
      method: 'get',
      params:query,
  });
}



//设备维保中维保类型

export const maintainStateList = query => {
  return request({
      url: `/api/maintain/maintenance/maintainStateList`,
      method: 'get',
      params:query,
  });
}

// 设备统计列表
export const selectDeviceRunData = query => {
  return request({
      url: `/api/device/deviceWorkStatistics/selectDeviceRunData`,
      method: 'get',
      params:query,
     
  });
}

// 查询设备统计下设备
export const deviceListByType = query => {
  return request({
      url: `/api/device/deviceListByType`,
      method: 'get',
      params:query,
     
  });
}

// 设备统计中车间种类

export const deviceTypeList = query => {
  return request({
      url: `/api/device/deviceTypeList`,
      method: 'get',
      params:query,
     
  });
}


// 运行监控

export const selectDeviceRunList = query => {
  return request({
      url: `/api/device/deviceWorkStatistics/selectDeviceRunList`,
      method: 'get',
      params:query
  });
}




// 生产管理

// 生产服务
export const produceTaskpage = query => {
  return request({
      url: `/api/producetask/produceTask/page`,
      method: 'get',
      params:query
  });
}






//数据统计


//设备绩效

export const selectDeviceWorkTimeList = query => {
  return request({
      url: `/api/device/deviceWorkStatistics/selectDeviceWorkTimeList`,
      method: 'get',
      params:query
  });
}




// 维保统计
export const selectDeviceMaintainData = query => {
  return request({
      url: `/api/device/deviceMaintain/selectDeviceMaintainData`,
      method: 'get',
      params:query
  });
}








// 生产绩效

export const selectProduceWorkRate = query => {
  return request({
      url: `/api/producetask/produceStatistics/selectProduceWorkRate`,
      method: 'get',
      params:query
  });
}






// 班组长

// 领单报工 页列表
export const listByUserId = query => {
  return request({
      url: `/api/producetask/produceTaskAssign/listByUserId`,
      method: 'get',
      params:query,
      headers: {'userId': localStorage.getItem('userId')}
  });
}


export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};


