<template>
  <div class="promoadl">
    
    <el-dialog :title="tit" :visible.sync="dialogFormVisible" :before-close='beforclose' center>
        <el-row>
           <el-form :model="form" ref='form'>
               <el-col :span="11">
                    <el-form-item label="任务单号" :label-width="formLabelWidth" >
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="订单编号" :label-width="formLabelWidth" prop='taskNumber'>
                            <el-input v-model="form.taskNumber" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
              
               <el-col :span="24">
                        <el-col :span="11">
                            <el-form-item label="生产物料" :label-width="formLabelWidth" >
                                    <el-input v-model="form.no" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                <p>
                    <el-col :span="11">
                        <el-form-item label="物料名称" :label-width="formLabelWidth" prop='productName'>
                                <el-input v-model="form.productName" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="物料编码" :label-width="formLabelWidth" prop='productCode'>
                            <el-input v-model="form.productCode" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="11">
                            <el-form-item label="规格型号" :label-width="formLabelWidth" prop='specificationModel'>
                                    <el-input v-model="form.specificationModel" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    
                </p>
             
                <el-col :span="11">
                            <el-form-item label="计划产量" :label-width="formLabelWidth" prop='planYield'>
                                    <el-input v-model="form.planYield" autocomplete="off"></el-input>
                            </el-form-item>
                </el-col>
                  
                 <el-col :span="11">
                    <el-form-item label="计划时间" :label-width="formLabelWidth" >
                           <el-date-picker
                           style='width:100%'
                           @change='changetime'
                            v-model="value2"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"> 
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form> 
        </el-row>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="marksure('form')">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { produceTask,produceTaskid,produceTaskput } from 'api/index'
import moment from 'moment'
export default {
    name: 'promoadl',
  
    props:{
        dialogFormVisible:{
            type:Boolean
        },
        tit:{
            type:String
        }
    },
    data() {
        return {
            form: {
                productName: '',
                productCode: '',
                specificationModel: '',
                planYield: '',
                delivery: false,
                planStartTime: '',
                planEndTime: '',
                
            },
            value2:[],
            formLabelWidth: '80px'
        }
    },
    created(){
       
    },
    methods: {
       changetime(h){
           this.form.planStartTime = moment(h[0]).format('YYYY-MM-DD')
            this.form.planEndTime = moment(h[1]).format('YYYY-MM-DD')
       },
       close(num){
           this.init()
           this.$emit('close',num)
       },
       getproduceTaskid(id){
           produceTaskid(id).then(res=>{
               if(res.code==='0'){
                   this.value1 = [res.data.planStartTime,res.data.planEndTime]
                   this.form = res.data
               }
           })
       },
       marksure(form){
          this.$refs[form].validate((valid) => {
                if (valid) {
                    if(this.tit==='新增任务'){
                        produceTask(this.form).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.close('0')
                            }
                        })
                    }else[
                        produceTaskput(this.form).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.close('0')
                            }
                        })
                    ]
                    
                }
          })
       },
       beforclose(){
           this.init()
          this.$emit('close',false)
       },
       init(){
           this.form= {
                productName: '',
                productCode: '',
                specificationModel: '',
                planYield: '',
                delivery: false,
                planStartTime: '',
                planEndTime: '',
                
            }
            this.value2 = []
       }
    }
}
</script>


<style lang='less'>
    .promoadl{
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
