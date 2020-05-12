<template>
  <div class="poper">
       <div class="top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
             <el-form-item label="日期:" class="handle-select mr10" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="value1"
                    type="year"
                    placeholder="选择年">
                    </el-date-picker>
             </el-form-item>
              <el-form-item class="handle-select mr1">
                  <el-button type="success" icon="el-icon-refresh-right" @click="resetting">重置</el-button>
              </el-form-item>
                <el-form-item class="handle-select mr1">
                  <el-button type="add" icon="el-icon-search" @click="seachinfo">搜索</el-button>
              </el-form-item>
             </el-form>
          </div>
          <div class="bot">
              <Charts ref="charts1"/>
          </div>
  </div>
</template>

<script>
import {selectProduceWorkRate} from 'api/index'
import Charts from './charts'
export default {
    name: 'poperformance',
    components:{
        Charts
    },
    data() {
        return {
            value1:'',
            formInline:{},
            formLabelWidth:'80px',
        }
    },
    created(){
        this.getselectProduceWorkRate()
    },
    methods: {
        getselectProduceWorkRate(){
            selectProduceWorkRate().then(res=>{
              
                let a =[]
                let b = []
                let c= []
                let d = []
                if(res.code==='0'){
                    res.data.map(item=>{
                        a.push(item.taskNumber)
                        b.push(item.planDay)
                        c.push(item.realDay)
                    })
                    d.push({name:'计划天数',type:'line',barWidth:'',data:b},{name:'实际天数',type:'line',barWidth:'',data:c})
                    this.$nextTick(()=>{ 
                        this.$refs.charts1.getxAxis(a)
                        this.$refs.charts1.getseries(d)
                        this.$refs.charts1.getoption()
                    })
             
                }
                
            })
        },
        resetting(){

        },
        seachinfo(){

        }
    }
}
</script>


<style lang='less'>
    .poper{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
         .top{
                height: 45px;
          
                .mr10{
                  width: 20%;
                  
                }
                .mr11{
                    margin-left: 4%;
                }
                .mr1{
                    float: right;
                }
                .el-form-item__content{
                    width: calc(100% - 80px);
                }
                .demo-form-inline{
                    margin-top: 9px;
                }
            }
             .bot{
               flex: 1; 
            }
    }
</style>
