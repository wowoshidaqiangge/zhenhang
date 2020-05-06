<template>
  <div class="headman">
      <div class="top">
          <v-head></v-head>
      </div>
     <div class="headnum">
         <div class="p1 p0">
             <p>ZH-WLW10-4-21</p>
             <p class="but">生产中</p>
         </div>
         <div class="p2 p0">纸芯上盖</div>
         <div class="p0"><p>规格型号:</p> <p> zh-w10</p></div>
         <div class="p0"><p>计划产量:</p> <p> 100</p></div>
         <div class="p0"><p>生产车间:</p> <p> 测试部门</p></div>
         <div class="p0"><p>已生产数:</p><p>100</p></div>
         <div class="progre">
             <el-progress type="circle" :percentage="25" :width=60></el-progress>
         </div>
         <div class="sub">
             <el-button type="primary" size='mini'>报工</el-button>
              <el-button type="add" size='mini'>报工</el-button>
        </div>
     </div>
   
  </div>
</template>

<script>
import {listByUserId} from 'api/index'
import vHead from 'components/common/Header.vue';
export default {
    name: 'headman',
    components:{
        vHead
    },
    data() {
        return {
            
        }
    },
    created(){
        this.getlistByUserId()
    },
    methods: {
        getlistByUserId(){
            listByUserId().then(res=>{
                debugger
            })
        }
    }
}
</script>


<style lang='less'>
    .headman{
        width: 100%;
        height: 100%;
        background: #E9E9E9;
        .top{
            background-color: #409BAF;
            .header{
                color: #fff;
            }
        }
        .headnum{
            width: 23%;
            margin: 1%;
            float: left;
            padding: 5px 0;
            background-color: #fff;
            position: relative;
            border-radius: 5px;
            .progre{
                position: absolute;
               
                right: 4%;
                bottom: 25%;
            }
            .p0{
                display: flex;
                padding: 2px 4%;
                p{
                    height: 22px;
                    line-height: 22px;
                    font-size: 15px;
                }
                .but{
                    padding: 0 8px;
                    height: 22px;
                    border-radius: 10px;
                    border: 1px solid #bdbdbd;
                    text-align: center;
                    cursor: pointer;
                    font-size: 12px;
                    color: #02A202;
                }
                p:nth-of-type(1){
                   margin-right: 5px;
                }
            }
            .p1{
                font-size: 13px;
                p:nth-of-type(1){
                    flex:1
                }
            }
            .p2{
                height: 30px;
                line-height: 25px;
                font-size: 18px;
            }
            .sub{
                float: right;
                padding: 12px 4%;
            }
            
        }
    }
</style>
