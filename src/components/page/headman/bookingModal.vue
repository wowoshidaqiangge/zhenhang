<template>
  <div class="bookmodal">
    <el-dialog 
    title="报工" 
    :destroy-on-close='isclose'
    :visible.sync="dialogVisible1"
    width='48%' 
    :before-close='beforclose' 
    center>
        <div v-if='booking'>
             <p class="modaltit">请刷取您的员工卡开始报工！</p>
            <el-input class="idnum"  v-model="input" placeholder="员工卡号"  ref="getFocus1" @keyup.enter.native="search1()"></el-input>
        </div>
       <div v-if='!booking'>
           <p class="modaltit1">工单信息：</p>
            <el-row>
                <el-form :model="form" :rules="rules" ref="form">
                    <div class="modalcont">
                    <el-col :span="11">
                        <el-form-item label="工单号码" :label-width="formLabelWidth" class="formitem formitem1" prop="taskNumber">
                                <el-input v-model="form.taskNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="货品编码" :label-width="formLabelWidth" class="formitem formitem1" prop="productCode">
                                <el-input v-model="form.productCode" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="元件编号" :label-width="formLabelWidth" class="formitem formitem1" prop="partNumber">
                                <el-input v-model="form.partNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="部件编码" :label-width="formLabelWidth" class="formitem formitem1" prop="partCode">
                                <el-input v-model="form.partCode" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="计划产量" :label-width="formLabelWidth" class="formitem formitem1" prop="planYield">
                                <el-input v-model="form.planYield" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="所属部门" :label-width="formLabelWidth" class="formitem formitem1" prop="deptName">
                                <el-input v-model="form.deptName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    </div>
                    
                    <el-col :span="21">
                        <p class="modaltit1">请填写生产数量：</p>
                    </el-col>
                    
                    <el-col :span="11">
                        <el-form-item label="生产数量" :label-width="formLabelWidth" class="formitem formitem1" prop="produceCount">
                            <el-input v-model="form.produceCount" @keyup.native='form.produceCount=form.produceCount.replace(/[^\d]/g,"")'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="已生产数" :label-width="formLabelWidth" class="formitem formitem1" prop="nowCount">
                            <el-input v-model="form.nowCount" disabled></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="11">
                        <el-form-item label="返工数量" :label-width="formLabelWidth" class="formitem formitem1" prop="rework">
                            <el-input v-model="form.rework" @keyup.native='form.rework=form.rework.replace(/[^\d]/g,"")'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="返工原因" :label-width="formLabelWidth" class="formitem formitem1" prop="reworkRemark">
                            <el-input v-model="form.reworkRemark"  type="textarea" :rows="1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="11">
                            <el-form-item label="报废数量" :label-width="formLabelWidth" class="formitem formitem1" prop="scrap">
                                <el-input v-model="form.scrap" @keyup.native='form.scrap = form.scrap.replace(/[^\d]/g,"")'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="报废原因" :label-width="formLabelWidth" class="formitem formitem1" prop="scrapRemark">
                                <el-input v-model="form.scrapRemark"  type="textarea" :rows="1"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    
                   
                     <el-col :span="22">
                        <el-form-item label="工单全部完成" :label-width="formLabelWidth" class="formitem formitem1" prop="reportState">
                            <el-switch active-value='1' inactive-value='0' v-model="form.reportState"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="22">
                        <el-form-item label="备注" :label-width="formLabelWidth" class="formitem formitem1" prop="remark">
                            <el-input type="textarea" v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
                
            </el-row>
        
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="marksure('form')" :loading="sureload">确 定</el-button>
            </div>
       </div>
    </el-dialog>

  </div>
</template>

<script>
import { produceTaskReport } from 'api/index'
export default {
    name: 'bookmodal',
  
    props:{
        dialogVisible1:{
            type:Boolean
        },
        modalinfo:{
            type:Object

        },
        isedit:{
            type:Boolean
        }
    },
    data() {
        return {
            booking:true,
            input:'',
           isclose:true,
           sureload:false,
           form1:{

           },
            form: {
                taskNumber: '',
                nowCount: '',
                deviceType: '',
                planManhourAvgyield: '',
                specificationModel: '',
                productName: '',
                productCode:'',
                produceCount:''
            },
            icCard:sessionStorage.getItem('icCard'),
            formLabelWidth: '100px',
            rules: {
                produceCount:[
                     { required: true, message: '请输入', trigger: 'blur' },
                    //  {
                    //     validator(rule, value, callback) {
                    //     var reg = /^[0-9][0-9]*$/
                    //     if (reg.test(value)) {
                    //         callback()
                    //     } else {
                    //         callback(new Error('数量必须为整数'))
                    //     }
                    //     },
                    //     trigger: 'change'
                    // }
                ],
                rework:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                scrap:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ]
            }
        }
    },
    created(){
        
    },
    mounted(){
         
    },
    watch:{
        
    },
    methods: {
        search1(){
            if(this.icCard===this.input){
                this.booking = false
            }else{
                this.$message.error('卡号与登录者卡号不符！')
            }
        },
       getform(info){
           let res = JSON.parse(JSON.stringify(info))
           delete res.remark
           this.form = res
           this.$nextTick(function() {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {// 100毫秒延迟解决第二次打开弹框，输入框不自动获取焦点的bug
                    this.$refs.getFocus1.focus();
                }, 100);
           })
       },
       close(num){
           this.init()
           this.$emit('close',num)
       },
       //初始化
       init(){
           this.form= {
                taskNumber: '',
                nowCount: '',
                deviceType: '',
                planManhourAvgyield: '',
                specificationModel: '',
                productName: '',
                productCode:'',
                produceCount:''
            }
            this.input = ''
             this.booking = true
       },
       marksure(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                    produceTaskReport(this.form).then(res=>{
                        if(res.code==='0'){
                            this.$message.success(res.msg)
                            this.close('0')
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false;
                }
            });
       },
       beforclose(){
          this.init()
          this.$emit('close',false)
       },
    
    }
}
</script>


<style lang='less'>
  .bookmodal{
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
      .dialog-footer{
            text-align: end;
        }
  }

</style>
