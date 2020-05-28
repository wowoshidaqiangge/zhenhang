<template>
  <div class="constrol" >
    <el-tabs  type="card">
        <el-tab-pane :label="item.deviceType" v-for="(item,index) in runlist" :key='index' class="conlist">
            
           
            <div class="con">
                <div class='row-bg' v-for='h in item.deviceRunVo' :key='h.id'>
                    <div class="p1"><span class="icon"></span><span class="tit" > {{h.deviceName}}</span><span class="img"><img src='~@/assets/img/wifi.png'/></span></div>
                    <div class="p1">
                        <p><span>开机时长:</span><span> {{h.onLength}}h</span></p>
                        <p>
                          <span class="icon1 icon2" v-if="h.state=='1' "></span> 
                          <span class="icon1 icon3" v-if="h.state=='2' "></span> 
                          <span class="icon1 icon4" v-if="h.state=='3' "></span> 
                           <span>{{h.deviceState}}</span>
                        </p>
                    </div>
                    <div class="p1">
                        <p><span>累计运行:</span><span> {{h.runLength}}h</span></p>
                        <p><span>当日产量:</span><span> {{h.dayProduce}}件</span></p>
                    </div>
                    <div class="p1">
                        <p><span>使用效率:</span><span style="color:#EB6F43 "> {{h.useRate}}</span></p>
                        <p><span>累计产量:</span><span> {{h.totalProduce}}件</span></p>
                    </div>
                </div>
           
            </div>
        </el-tab-pane>
      
    </el-tabs>
      
      
  </div>
</template>

<script>
import {selectDeviceRunList} from 'api/index'
export default {
    name: 'control',
    data() {
        return {
            runlist:[]
        }
    },
    created(){
        this.getselectDeviceRunList()
    },
    methods: {
      getselectDeviceRunList(){
          selectDeviceRunList().then(res=>{
              if(res.code==='0'){
                  this.runlist = res.data
              }
          })
      }
    }
}
</script>


<style lang='less'>
.constrol{
    overflow: hidden;
    height: 100%;
    .top{
        height: 30px;
    };
    .conlist{
        flex: 1;
        flex-direction: column;
        margin-bottom: 10px;
        display: flex;
        .crumbs{
            color: #2C3E50;
            font-weight: 600;
            padding-left: 1%;
        }
    }
    .el-tabs{
        width: 100%;
        height: 100%;
        .el-tabs__content{
            height: calc(100% - 40px);
            overflow: auto;
        }
        .el-tabs__header{
            border-bottom:none
        }
        .el-tabs__nav{
            border-bottom: 1px solid #e4e7ed;
            border-radius: 0;
        }
        .is-active{
            color:#fff;
            background-color: #409baF;
        }
    }
    .con{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
       .row-bg{
          
           width: 21%;
           padding: 0 10px;
           margin: 1%;
           flex-wrap: wrap;
           box-shadow:0px 1px 4px 2px rgba(0,150,255,0.09);
           border-radius:5px;
          .grid-content {
             border-radius: 4px;
             min-height: 99%;
             border: 1px solid #ccc;
          }
           .p1{
               display: flex;
                height: 40px;
                align-items: center;
               .icon{
                    width:3px;
                    height:13px;
                    background:rgba(92,193,207,1);
                    border-radius:2px;
                    display: inline-block;
                    margin-right: 4px;
               }
               .img{
                   width: 18px;
                   img{
                       width: 100%;
                   }
               }
               .tit{
                   width: calc(100% - 25px);
               }
               p{
                   flex: 1;
                   font-size: 13px;
                  
               }
               p:nth-of-type(1)  {
                   span{
                       color: #8c8c8c;
                   }
               } 
               p:nth-of-type(2)  {
                   span{
                       color: #8c8c8c;
                   }
                   .icon1{
                        width:10px;
                        height:10px;
                        border-radius:50%;
                        display: inline-block;
                        margin-right: 5px;
                   }
                   .icon2{
                       background:#ccc
                   }
                   .icon3{
                       background:rgba(0,150,255,1);
                   }
                   .icon4{
                       background:#23d249;
                   }
               }  
           } 
             
       }
    }
}

</style>
