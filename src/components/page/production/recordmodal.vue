<template>
  <div class="recordmodal">
    
    <el-dialog title="报工记录" :visible.sync="dialogFormVisible1" width='68%'  :before-close='beforclose' center>
        <p class="modaltit1">工单信息：</p>
        <el-row>
           <el-form :model="form" ref='form'>
               <el-col class="modalcont">
                   <el-col :span="11">
                        <el-form-item label="工单号" :label-width="formLabelWidth" prop='taskNumber'>
                                <el-input v-model="form.taskNumber" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                   <el-col :span="11">
                        <el-form-item label="部门" :label-width="formLabelWidth" prop='deptName'>
                                <el-input v-model="form.deptName" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="元件编号" :label-width="formLabelWidth" prop='partNumber'>
                                <el-input v-model="form.partNumber" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="部件编码" :label-width="formLabelWidth" prop='partCode'>
                                <el-input v-model="form.partCode" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="元件名称" :label-width="formLabelWidth" prop='partName'>
                                <el-input v-model="form.partName" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="发料工序" :label-width="formLabelWidth" prop='stWorkprocess'>
                                <el-input v-model="form.stWorkprocess" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="计划产量" :label-width="formLabelWidth" prop='planYield'>
                                <el-input v-model="form.planYield" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
               </el-col>
           </el-form>
        </el-row>

        <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column
               
                v-for='item in columlist'
                :width='item.width'
                :key='item.index'
                :prop="item.prop"
                :label="item.label"
                align="center"
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
            columlist:[{prop:'index',label:'序号',width:80},
            {prop:'produceTaskId',label:'报工流水号'},
            {prop:'reportUser',label:'生产员工'},
            {prop:'produceCount',label:'生产数量'},
            {prop:'totalCount',label:'累计产量'},
            {prop:'scrap',label:'报废数'},
            {prop:'scrapRemark',label:'报废原因'},
            {prop:'rework',label:'返工数'},
            {prop:'reworkRemark',label:'返工原因'},
            {prop:'createTime',label:'报工时间'},
            {prop:'remark',label:'备注'}
            ],
            form:{
            }
        }
    },
    created(){
       
    },
    methods: {
       getpageByProduceTaskPlanId(id,m){
           var obj ={produceTaskPlanId:id,...this.page}
           pageByProduceTaskPlanId(obj).then(res=>{
               if(res.code==='0'){
                   res.data.records.map((item,index)=>{
                       item.index = index+1
                       item.produceTaskId = m.taskNumber
                   })
                   this.form = m
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
         .modalcont{
          padding: 25px 0;
          border: 1px dashed #aaa;
          margin-bottom: 25px;
        //   height: 140px;

        }
        .modaltit1{
            padding: 10px 0;
            font-size: 18px;
            color: #324170;
        }
        
    }

</style>
