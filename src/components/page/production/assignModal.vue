<template>
  <div class="assignmodal">
    
    <el-dialog :title="tit" :visible.sync="dialogFormVisible" :before-close='beforclose' center>
        <p class="modaltit1">工单信息：</p>
        <el-row>
           <el-form :model="form" ref='form'>
               <div class="modalcont">
                   <el-col :span="11">
                        <el-form-item label="任务单号" :label-width="formLabelWidth" prop='taskNumber'>
                                <el-input v-model="form.taskNumber" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门" :label-width="formLabelWidth" prop='deviceType'>
                                <el-input v-model="form.deviceType" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="物料名称" :label-width="formLabelWidth" prop='productName'>
                                <el-input v-model="form.productName" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="物料编码" :label-width="formLabelWidth" prop='productCode'>
                                <el-input v-model="form.productCode" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="规格型号" :label-width="formLabelWidth" prop='specificationModel'>
                                <el-input v-model="form.specificationModel" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="计划产量" :label-width="formLabelWidth" prop='planYield'>
                                <el-input v-model="form.planYield" disabled autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
               </div>
                     <el-col :span="12" v-if="tit!=='工单分解'">
                        <el-form-item label="部门" :label-width="formLabelWidth" prop='userId' >
                                 <el-cascader
                                    v-model="form.userId"
                                    :options="getuserList"
                                    :props='casprops'
                                    
                                    @change="handleChange">
                                </el-cascader>
                        </el-form-item>
                    </el-col>
                   
                     <el-col :span="12" v-if="tit!=='工单分解'">
                        <el-form-item label="生产设备" :label-width="formLabelWidth" prop='deviceId'>
                                <el-select v-model="form.deviceId" placeholder="请选择">
                                    <el-option
                                        v-for="item in devicelist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                    </el-col>

            </el-form> 
    
            <el-col :span="24" v-if="tit==='工单分解'">
                <span>分解工单数:</span>
                <el-input-number v-model="num" @change="handleChange" :min="0" :max="5" style="margin:10px 0 20px 23px"></el-input-number>
            </el-col>
             
            <el-col :span="24" v-if="tit==='工单分解'">
                <span style="line-height:32px">分工单计划产量:</span>
                 <div v-for='(item,index) in numlist' :key='index' style="width:10%;display:inline-block;margin-left:17px">
                    <el-input v-model="item.value" @change="(e)=>{changevalue(e,index)}"></el-input>
                 </div>
            </el-col>

            <!-- <el-col :span="24" >
                <span style="line-height:32px">文件上传:</span>
                <div>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="http://jsonplaceholder.typicode.com/api/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                       
                    </el-upload>
                </div>
            </el-col> -->

        </el-row>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="marksure('form')">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { produceTaskPlanid,saveProduceTaskPlan,deviceList,userListByDept, produceTaskAssign } from 'api/index'
import moment from 'moment'
export default {
    name: 'assignmodal',
  
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
                taskNumber: '',
                planStartTime: '',
                planEndTime: '',
                yieldList:[],
                userId :''
            },
            formLabelWidth: '80px',
            num:0,
            numlist:[],
            value0:'',
            value1:'',
            value2:'',
            value3:'',
            value4:'',
            value5:'',
            devicelist:[],
            getuserList:[],
            casprops:{
                label:'title',
               
                value:'id',
                children:'userList'
            }
        }
    },
    created(){
        this.getdeviceList()
        this.getuserListByDept()
    },
    methods: {
        // 设备列表
        getdeviceList(){
            deviceList().then(res=>{
                this.devicelist= res.data
            })
        },
        //获取部门下用户
        getuserListByDept(){
            userListByDept().then(res=>{
                if(res.code ==='0'){
                    this.getuserList = res.data
                }
            })
        },
        changevalue(value,index){
           this[`value${index}`] = value.toString()
        },
        // 获取详情
       getproduceTaskPlanid(id){
           var obj = {id:id.produceTaskPlanId}
           produceTaskPlanid(obj).then(res=>{
              res.data.userId = res.data.executeUserId
               this.form = res.data
           })
       },
       handleChange(val){
           this.num = val
           let arr = []
           for(let a= 0;a<val;a++){
               arr.push({value:this[`value${a}`]})
           }
           this.numlist = arr
       },
       close(num){
           this.init()
           this.$emit('close',num)
       },
      
       marksure(form){
          this.$refs[form].validate((valid) => {
                if (valid) {
                    // 处理分单
                   if(this.tit === '工单分解'){
                       let arr =[]
                        this.numlist.map((item,index)=>{
                            arr.push(this[`value${index}`])
                        })
                        this.form.yieldList = arr
                        saveProduceTaskPlan(this.form).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.close('0')
                            }else{
                                this.$message.error(res.msg)
                            }
                        })
                   }else if(this.tit==='派单' || this.tit==='修改'){
                       this.form.userId = this.form.userId[1]
                       produceTaskAssign(this.form).then(res=>{
                           this.$message.success(res.msg)
                           this.close('0')
                       })
                   }
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
                taskNumber: '',
                planStartTime: '',
                planEndTime: '',
                yieldList:[]
            }
            this.value0=''
            this.value1=''
            this.value2=''
            this.value3=''
            this.value4=''
            this.value5=''
            this.num=0
            this.numlist=[]
            
       }
    }
}
</script>


<style lang='less'>
    .assignmodal{
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
          margin-bottom: 15px;
          height: 140px;

        }
        .modaltit1{
            padding: 10px 0;
            font-size: 18px;
            color: #324170;
        }
        
    }

</style>
