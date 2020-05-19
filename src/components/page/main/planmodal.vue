<template>
  <div class="planmodal">
    <el-dialog 
    :title="tit" 
    :destroy-on-close='isclose'
    :visible.sync="dialogFormVisible"
    width='50%' 
    :before-close='beforclose' 
    center>
    <el-row>
         <el-form :model="form" :rules="rules" ref="form">
             <el-col :span="24">
                 <el-form-item label="设备类型" :label-width="formLabelWidth" class="formitem formitem1" prop="category">
                    <el-select v-model="form.category" placeholder="请选择" @change='changeselect'>
                        <el-option
                        v-for="item in deptlist"
                        :key="item.enumKey"
                        :label="item.enumValue"
                        :value="item.enumKey">
                        {{item.enumValue}}
                        </el-option>
                    </el-select>
                </el-form-item>
             </el-col>
             <el-col :span="24">
                 <el-form-item label="设备编号" :label-width="formLabelWidth" class="formitem formitem1" prop="deviceId">
                    <el-select v-model="form.deviceId" placeholder="请选择" >
                        <el-option
                        v-for="item in devicelist"
                        :key="item.deviceId"
                        :label="item.deviceName"
                        :value="item.deviceId">
                        {{item.deviceName}}
                        </el-option>
                    </el-select>
                </el-form-item>
             </el-col>
             <el-col :span="24">
                 <el-form-item label="所属类别" :label-width="formLabelWidth" class="formitem formitem1" prop="period">
                        <el-radio-group v-model="form.period">
                            <el-radio label="A型"></el-radio>
                            <el-radio label="B型"></el-radio>
                        </el-radio-group>
                </el-form-item>
             </el-col>
              <el-col :span="11">
                 <el-form-item label="保养周期" :label-width="formLabelWidth" class="formitem formitem1" prop="toType">
                    <el-select v-model="form.toType" placeholder="请选择">
                       <el-option
                            v-for="item in timelist"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
             </el-col>
             <el-col :span="11">
                 <el-form-item label="保养时间" :label-width="formLabelWidth" class="formitem formitem1" prop="dateTime">
                        <el-date-picker
                            v-model="form.dateTime"
                            @change='changetime'
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>
             </el-col>
            <el-col :span="11">
                 <el-form-item label="担当人" :label-width="formLabelWidth" class="formitem formitem1" prop="assumeUserId">
                        <el-select v-model="form.assumeUserId" placeholder="请选择">
                            <el-option
                                    v-for="item in userlist"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                         </el-select>
                </el-form-item>
             </el-col>
            
            <el-col :span="11">
                 <el-form-item label="责任人" :label-width="formLabelWidth" class="formitem formitem1" prop="dutyUserId">
                        <el-select v-model="form.dutyUserId" placeholder="请选择">
                        <el-option
                                v-for="item in userlist"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                </el-form-item>
             </el-col>
             <el-col :span="24">
                 <el-form-item label="备注" :label-width="formLabelWidth" class="formitem formitem1" prop="remark">
                        <el-input v-model="form.remark" ></el-input>
                </el-form-item>
             </el-col>
           
        </el-form>
    </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="marksure('form')" :loading="sureload">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { deviceToTypeList,getListByToType,maintenanceadd,maintenanceid,maintenanceput} from 'api/main'
import {userPage,deviceTypeList} from 'api/index'
import moment from 'moment'
export default {
    name: 'planmodal',
  
    props:{
        dialogFormVisible:{
            type:Boolean
        },
        tit:{
            type:String
        },
       
    },
    data() {
        return {
            isclose:true,
            sureload:false,
            deptlist:[],
            rolelist:[],
            devicelist:[],
            form: {
              category:'',
              deviceId:'',
              period:'A型',
              dateTime:'',
              assumeUserId:'',
              dutyUserId:'',
              remark:''
            },
            formLabelWidth: '90px',
            rules: {
                name: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
               
            },
            timelist:[{value:'year',label:'按年'},{value:'month',label:'按月'}],
            userlist:[]
        }
    },
    created(){
      this.getdeviceToTypeList()
      this.getuserPage()
    },
    mounted(){
        
    },
    watch:{
     
    },
    methods: {
        //查看详情
        getmaintenanceid(id){
            maintenanceid(id).then(res=>{
                if(res.code==='0'){
                    this.form = res.data
                }
            })
        },
        // 获取用户列表
        getuserPage(){
            userPage().then(res=>{
                if(res.code==='0'){
                    this.userlist = res.data.records
                }
            })
        },
        // 设备类型
       getdeviceToTypeList(){
           deviceToTypeList().then(res=>{
               if(res.code==='0'){
                   this.deptlist = res.data
               }
           })
       },
      // 修改设备
      changeselect(val){
          this.devicelist = []
          this.form.deviceId = ''
          this.getListByToType({toTypeId:val})
      },
      // 根据类型查设备编号
      getListByToType(id){
          getListByToType(id).then(res=>{
              if(res.code==='0'){
                   this.devicelist = res.data
               }
          })
      },
      // 修改时间
      changetime(val){
          this.form.dateTime = moment(val).format('YYYY-MM-DD')
      },
       close(num){
           this.init()
           this.$emit('close',num)
       },
       //初始化
       init(){
           this.form= {
              category:'',
              deviceId:'',
              period:'A型',
              dateTime:'',
              assumeUserId:'',
              dutyUserId:'',
              remark:''
            }
       },
       marksure(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                    if(this.tit==='新增'){
                        maintenanceadd(this.form).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.close('0')
                            }
                        })
                    }else{
                        maintenanceput(this.form).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.close('0')
                            }
                        })
                    }
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
       },
       beforclose(){
          this.init()
          this.$emit('close',false)
       }
    }
}
</script>


<style lang='less'>
    .planmodal{
        .el-dialog{
            border-radius: 5px;
        }
        .el-dialog__header{
            background-color: #409BAF;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
           .el-dialog__title{
               color: #fff;
                 letter-spacing: 2px;
           }
           .el-dialog__headerbtn .el-dialog__close{
               color: #fff;
             
           }
        }
        .dialog-footer{
            text-align: end;
        }
        .el-form{
            display: flex;
            flex-wrap: wrap;
        }
        .el-select {
            width: 100%;
        }
        .el-col{
            margin-bottom: 20px;
        }
    
    }

</style>
