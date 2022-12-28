<!--
 * @Descripttion: 
 * @version: 
 * @Author: renqiang_hu
 * @Date: 2021-08-24 15:47:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-24 17:45:59
 * @FilePath: \vue-manage-system\src\components\page\dispose\productManage\proModel.vue
-->
<template>
    <div>
        <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose">
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            direction:"rtl"
        }
    },
    props:{
        drawer:{
            type:Boolean
        }
    },
    methods:{
        handleClose(){

        }
    }
}
</script>
<style lang="less">

</style>