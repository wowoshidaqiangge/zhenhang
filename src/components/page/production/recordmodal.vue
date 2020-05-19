<template>
  <div class="recordmodal">
    
    <el-dialog title="报工记录" :visible.sync="dialogFormVisible1" :before-close='beforclose' center>
       
        <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column
                v-for='item in columlist'
                :key='item.index'
                :prop="item.prop"
                :label="item.label"
                >
            </el-table-column>
        </el-table> 
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="marksure('form')">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { pageByProduceTaskPlanId} from 'api/index'

import moment from 'moment'
export default {
    name: 'recordmodal',
  
    props:{
        dialogFormVisible1:{
            type:Boolean
        },
        tit:{
            type:String
        }
    },
    data() {
        return {
           
            formLabelWidth: '80px',
            tableData1:[],
            page:{
                current:1,
                size:10
            },
            columlist:[{prop:'index',label:'序号'},
            {prop:'produceTaskId',label:'报工流水号'},
            {prop:'reportUser',label:'生产员工'},
            {prop:'index',label:'生产设备'},
            {prop:'produceCount',label:'生产数量'},
            {prop:'createTime',label:'报工时间'},]
        }
    },
    created(){
       
    },
    methods: {
       getpageByProduceTaskPlanId(id){
           var obj ={produceTaskPlanId:id,...this.page}
           pageByProduceTaskPlanId(obj).then(res=>{
               if(res.code==='0'){
                   res.data.records.map((item,index)=>{
                       item.index = index+1
                   })
                   this.tableData1 = res.data.records
               }
           })
       },
       close(num){
         
           this.$emit('close1',num)
       },
      
       marksure(form){
          this.$emit('close1',false)
       },
       beforclose(){
          
          this.$emit('close1',false)
       },
      
    }
}
</script>


<style lang='less'>
    .recordmodal{
        .el-dialog{
            border-radius: 5px;
        }
        .el-dialog__header{
            background-color: #409BAF;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
           .el-dialog__title{
               color: #fff;
           }
           .el-dialog__headerbtn .el-dialog__close{
               color: #fff;
           }
        }
        .dialog-footer{
            text-align: end;
        }
        
    }

</style>
