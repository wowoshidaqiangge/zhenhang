<template>
    <div class="charts">
      <!-- <el-button type="primary" @click="jump">添加路由</el-button> -->
      
      123456
  </div>
</template>

<script>
   import Router from 'vue-router';
   import {insertRouter} from '@/components/common/argu/addroute'
    export default {
        name: 'upload',
        data() {
            return {
               option:{},

            }
        },
        components: {
            
        },
        mounted(){
    
        },
        methods:{
                // 用于手动配置动态路由
                jump() {
                    const o = parseInt(Math.random() * 10)
                    const name = "listing" + o;
                    /**
                     * @param { 当前实例 } vm
                     * @param { 当前动态路由模板名字 } component
                     * @param { 临时缓存组件地址 } com
                     * @param { 路由name } name 具体看业务是传订单号，还是name+时间戳 要求是不重复
                     * @param { 具体传参数 } params
                     * @param { 查询参数 } query
                     */
                    var obj = {
                        vm: this,
                        component: "params",
                        com: "@/components/page/argu/params.vue",
                        name: name,
                        params: {
                        id: o
                        },
                        query: {}
                    };
                    insertRouter(obj);
                },
        },
        created(){
          
        }
    }
</script>

<style scoped>
    .charts{
        width: 100%;
        height: 100%;
    }
</style>