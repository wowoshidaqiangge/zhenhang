import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        // 大屏
        {
            path: '/dashboard',
            component: () =>
                import (
                    /* webpackChunkName: "dashboard" */
                    '../components/page/globalPage.vue'
                ),
            meta: { title: '大屏' }
        },
        {
            path: '/',
            component: () =>
                import (
                    /* webpackChunkName: "home" */
                    '../components/common/Home.vue'
                ),
            meta: { title: '大屏' },
            children: [{
                    path: '/dashboard1',
                    component: () =>
                        import (
                            /* webpackChunkName: "dashboard" */
                            '../components/page/Dashboard.vue'
                        ),
                    meta: { title: '系统首页' }
                },
                // 订单管理
                {
                    path: '/orderAddMenu',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/order/orderAddMenu.vue'
                        ),
                    meta: { title: '订单新增', keepAlive: false }
                },
                {
                    path: '/orderCheckMenu',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/order/orderCheckMenu.vue'
                        ),
                    meta: { title: '订单审核', keepAlive: false }
                },
                {
                    path: '/orderQueryMenu',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/order/orderQueryMenu.vue'
                        ),
                    meta: { title: '订单查询', keepAlive: false }
                },
                // 设备管理
                {
                    path: '/control',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/device/control.vue'
                        ),
                    meta: { title: '运行监控', keepAlive: false }
                },
                {
                    path: '/statistics',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/device/statistics.vue'
                        ),
                    meta: { title: '设备统计', keepAlive: false }
                },
                {
                    path: '/maintenance',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/device/maintenance.vue'
                        ),
                    meta: { title: '设备维保', keepAlive: false }
                },

                //生产管理
                {
                    path: '/assignment',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/production/assignment.vue'
                        ),
                    meta: { title: '生产工单', keepAlive: false }
                },
                {
                    path: '/production',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/production/production.vue'
                        ),
                    meta: { title: '任务管理', keepAlive: false }
                },
                {
                    path: '/warehouseManage',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/production/warehouseManage.vue'
                        ),
                    meta: { title: '仓库管理', keepAlive: false }
                },
                {
                    path: '/purchaseManage',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/production/purchaseManage.vue'
                        ),
                    meta: { title: '采购管理', keepAlive: false }
                },
                {
                    path: '/purchase',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/production/purchase.vue'
                        ),
                    meta: { title: '采购信息', keepAlive: false }
                },
               
                //数据统计
                {
                    path: '/mainstatistics',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/datastat/mainstatistics.vue'
                        ),
                    meta: { title: '维保统计', keepAlive: false }
                },
                {
                    path: '/eqperformance',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/datastat/eqperformance.vue'
                        ),
                    meta: { title: '设备绩效', keepAlive: false }
                },
                {
                    path: '/poperformance',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/datastat/poperformance.vue'
                        ),
                    meta: { title: '生产绩效', keepAlive: false }
                },
                {
                    path: '/devicemain',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/datastat/devicemain.vue'
                        ),
                    meta: { title: '设备保养', keepAlive: false }
                },
                {
                    path: '/devicerepair',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/datastat/devicerepair.vue'
                        ),
                    meta: { title: '设备维修', keepAlive: false }
                },

                //人员管理

                {
                    path: '/staff',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/permanagement/staff.vue'
                        ),
                    meta: { title: '员工管理', keepAlive: false }
                },
                {
                    path: '/jurisdiction',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/permanagement/jurisdiction.vue'
                        ),
                    meta: { title: '权限管理', keepAlive: false }
                },

                // 维保管理
                {
                    path: '/mainplan',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/main/mainplan.vue'
                        ),
                    meta: { title: '维保计划', keepAlive: false }
                },
                {
                    path: '/mainrecord',
                    name: 'mainrecord',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/main/mainrecord.vue'
                        ),
                    meta: { title: '保养记录', keepAlive: false }
                },
                {
                    path: '/repairrecord',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/main/repairrecord.vue'
                        ),
                    meta: { title: '维修记录', keepAlive: false }
                },

                // 配置管理
                {
                    path: '/productManage',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/dispose/productManage/index.vue'
                        ),
                    meta: { title: '产品管理', keepAlive: false }
                },
                {
                    path: '/part',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/dispose/part/index.vue'
                        ),
                    meta: { title: '配件管理', keepAlive: false }
                },
                {
                    path: '/module',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/dispose/module/index.vue'
                        ),
                    meta: { title: '组件管理', keepAlive: false }
                },
                {
                    path: '/material',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/dispose/material.vue'
                        ),
                    meta: { title: '部件管理', keepAlive: false }
                },
                {
                    path: '/product',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/dispose/product.vue'
                        ),
                    meta: { title: '技术BOM', keepAlive: false }
                },
                {
                    path: '/record',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/dispose/record.vue'
                        ),
                    meta: { title: '设备档案', keepAlive: false }
                },

                {
                    path: '/table',
                    component: () =>
                        import (
                            /* webpackChunkName: "table" */
                            '../components/page/BaseTable.vue'
                        ),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () =>
                        import (
                            /* webpackChunkName: "tabs" */
                            '../components/page/Tabs.vue'
                        ),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () =>
                        import (
                            /* webpackChunkName: "form" */
                            '../components/page/BaseForm.vue'
                        ),
                    meta: { title: '基本表单' }
                },

                {
                    // 图片上传组件
                    path: '/upload',
                    component: () =>
                        import (
                            /* webpackChunkName: "upload" */
                            '../components/page/Upload.vue'
                        ),
                    meta: { title: '文件上传' }
                },

                {
                    // 权限页面
                    path: '/permission',
                    component: () =>
                        import (
                            /* webpackChunkName: "permission" */
                            '../components/page/Permission.vue'
                        ),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () =>
                        import (
                            /* webpackChunkName: "404" */
                            '../components/page/404.vue'
                        ),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () =>
                        import (
                            /* webpackChunkName: "403" */
                            '../components/page/403.vue'
                        ),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () =>
                import (
                    /* webpackChunkName: "login" */
                    '../components/page/Login.vue'
                ),
            meta: { title: '臻航生产管理系统' }
        },
        {
            path: '/headman',
            // redirect: '/headman',
            component: () =>
                import (
                    /* webpackChunkName: "login" */
                    '../components/page/headman/index.vue'
                ),

            meta: { title: '领单报工', keepAlive: false }
        },
        // 设置动态路由时需要注释
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (from.fullPath === '/headman') {
        if (to.fullPath === '/login') {
            next();
        } else {
            next({ path: '/headman' });
        }
    } else {
        next();
    }
});
export default router;