import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },

        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },

                // 设备管理
                {
                    path: '/control',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/device/control.vue'),
                    meta: { title: '运行监控' }
                },
                {
                    path: '/statistics',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/device/statistics.vue'),
                    meta: { title: '设备统计' }
                },
                {
                    path: '/maintenance',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/device/maintenance.vue'),
                    meta: { title: '设备维保' }
                },
                
                //生产管理
                {
                    path: '/assignment',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/production/assignment.vue'),
                    meta: { title: '任务统计' }
                },
                {
                    path: '/production',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/production/production.vue'),
                    meta: { title: '生产任务' }
                },
                 //数据统计
                 {
                    path: '/mainstatistics',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/datastat/mainstatistics.vue'),
                    meta: { title: '维保统计' }
                },
                {
                    path: '/eqperformance',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/datastat/eqperformance.vue'),
                    meta: { title: '设备绩效' }
                },
                {
                    path: '/poperformance',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/datastat/poperformance.vue'),
                    meta: { title: '生产绩效' }
                },

                //人员管理
                

                {
                    path: '/staff',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/permanagement/staff.vue'),
                    meta: { title: '员工管理' }
                },
                {
                    path: '/jurisdiction',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/permanagement/jurisdiction.vue'),
                    meta: { title: '权限管理' }
                },



                
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
               
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
               
            
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/headman',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/headman/index.vue'),
            meta: { title: '领单报工' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
