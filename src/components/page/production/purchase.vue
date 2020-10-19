<template>
  <div class="purchase">
       <div class="top">
          
              <el-form :model="seachinfo"  ref="seachinfo"  class="demo-ruleForm">
              <el-row type="flex" justify="end">
              
              <el-col :span="5">
                  <el-form-item label="" prop="value1">
                        <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            @change="changedate"
                            class="datetime"
                            end-placeholder="结束日期">
                        </el-date-picker>
                  </el-form-item>
                  
              </el-col>
             
              <el-col :span="3" style="margin:0 20px">
                  <el-form-item label=""  prop="zhNumberOrTaskNumber" >
                     <el-input  placeholder="请输入臻航号或任务单号" v-model="seachinfo.zhNumberOrTaskNumber" class="elinput"> </el-input>
                 </el-form-item>
              </el-col>
              <div style="margin:0 15px">
                      <el-button type="add" icon="el-icon-search" @click="seachinfo1">搜索</el-button>
                      <el-button type="success" icon="el-icon-refresh-right" @click="resetting">重置</el-button>
              </div>
              </el-row>
            </el-form>
     </div>
     <div>
         <el-table
                :data="tableData"
                stripe
                :height='screenWidth'
                style="width: 100%">
                
                <el-table-column
                    v-for="(item,index) in columnlist"
                    :key="index"
                    :width="item.width"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                >
                </el-table-column>
         </el-table>      
     </div>
      <div class="page">
                <el-pagination
                    :background='true'
                    :current-page.sync="pagesize"
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next"
                    :total="totals">
                </el-pagination>
           </div>
  </div>
</template>

<script>
import {taskitemBuypage} from 'api/main'
import moment from 'moment'
export default {
    name: 'purchase',
    components:{
      
    },
    data() {
        return {
          seachinfo:{
            beginDate:'',
            endDate:'',
            zhNumberOrTaskNumber:''
          },
          value1:'',
            page:{
              current:1,
              size:10
            },
            tableData:[],
            columnlist:[
              {prop:'index',label:'序号'},
              {prop:'stWorkprocess',label:'加工工序'},
              {prop:'taskNumber',label:'工单号'},
              {prop:'partCode',label:'部件编号'},
              {prop:'partName',label:'元件名称'},
              {prop:'partNumber',label:'元件编号'},
              {prop:'planBuyYield',label:'计划采购量'},
              {prop:'planStartTime',label:'计划开始时间'},
               {prop:'planEndTime',label:'计划结束时间'},
            ],
            screenWidth:'520px',
            pagesize:1,
            totals:0,
            screenWidth:(document.body.clientHeight-215) + 'px',
        }
    },
     computed: {
       
    },
    created(){
        this.gettaskitemBuypage()
    },
    methods: {
      changedate(val){
            this.seachinfo.beginDate = moment(val[0]).format('YYYY-MM-DD')
            this.seachinfo.endDate = moment(val[1]).format('YYYY-MM-DD')
      },
      seachinfo1(){
        this.page.current = 1
        this.gettaskitemBuypage(this.seachinfo)
      },
       //重置
       resetting(){
          this.seachinfo={
            beginDate:'',
            endDate:'',
            zhNumberOrTaskNumber:''
          }
          this.value1 =''
          this.page.current =1
          this.gettaskitemBuypage()
       },
        gettaskitemBuypage(info){
          let  obj = {...this.seachinfo,...this.page}
          taskitemBuypage(obj).then(res=>{
              if(res.code==='0'){
                res.data.records.map((item,index)=>{
                  item.index = index+1
                })
                  this.pagesize = parseInt(res.data.current)
                  this.totals = parseInt(res.data.total)
                  this.tableData = res.data.records
              }else{
                this.$message.error(res.msg)
              }
          })
        },
        handleCurrentChange(val){
          this.page.current = val
          this.gettaskitemBuypage()
        }
    }
}
</script>


<style lang='less'>
   .purchase{
    
      .top{
                height: 50px;
                margin-top: 10px;
               
                .datetime{
                    width:100%
                }
            }


            .page{
                margin-top: 10px;
                float: right;
            }
            .el-pager li.active{
                background-color: #409baF !important;
                color: #fff;
            }
   }
</style>
