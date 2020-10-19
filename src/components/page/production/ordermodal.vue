<template>
  <div class="ordermodal">
    
    <el-dialog :title="tit"  :visible.sync="dialogFormVisible" :before-close='beforclose' center>
        <el-row>
           <el-form :model="form" :rules="rules" ref='form'>
               <el-col :span="11">
                    <el-form-item label="订单编号" :label-width="formLabelWidth" prop='orderCode'>
                            <el-input v-model="form.orderCode" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="产品名称" :label-width="formLabelWidth" prop='productName'>
                            <el-input v-model="form.productName" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
               <el-col :span="24">
                        <el-col :span="11">
                            <el-form-item label="臻航号" :label-width="formLabelWidth" prop='productCode'>
                                    <el-input v-model="form.productCode" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="客户名称" :label-width="formLabelWidth" prop='customer'>
                                    <el-input v-model="form.customer" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                <p>
                    <el-col :span="11">
                        <el-form-item label="规格型号" :label-width="formLabelWidth" prop='model'>
                                <el-input v-model="form.model" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="生产量" :label-width="formLabelWidth" prop='planYield'>
                            <el-input v-model="form.planYield"  autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </p>
                 <el-col :span="11">
                    <el-form-item label="交货时间" :label-width="formLabelWidth" prop='planFinishTime'>
                           <el-date-picker
                           style='width:100%'
                           @change='changetime'
                            v-model="form.planFinishTime"
                           > 
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                  <el-col :span="11">
                        <el-form-item label="备注" :label-width="formLabelWidth" prop='remark'>
                            <el-input v-model="form.remark"  autocomplete="off" type="textarea" :rows="1"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="24">
                      <el-form-item label="工艺文件:" class="item" :label-width="formLabelWidth">
                          <el-upload 
                            :action="host" 
                            :data="ossParams" 
                            ref="updata" 
                            :on-success="handleSuccess"
                            :before-upload="beforeUpload"
                            :before-remove="beforeRemove"
                            :limit="limit" 
                            class="upload-demo1" 
                            multiple
                            :on-exceed="exceed" 
                            :file-list="fileList"
                            >
                              <el-button size="small" type="primary" >工艺文件上传</el-button>
                          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                          </el-upload>
                          
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
import { onenet } from 'api/onenet';
import {orderadd,orderid,orderput} from 'api/main'
import moment from 'moment'
export default {
    name: 'ordermodal',
  
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
            limit: 5,
            host: 'http://thingcom-dianliuji.oss-cn-hangzhou.aliyuncs.com',
            ossParams: {
                OSSAccessKeyId: '',
                policy: '',
                signature: '',
                expire: '',
                key: '', // key后面有用，先默认设空字符串
                success_action_status: '200' // 默认200
            },
            fileList: [],
             before:0,
            after:0,
            testbillList:[],
            ossParamskey:[],
            form: {
               orderCode:'',
               productName:'',
               productCode:'',
               model:'',
               planYield:'',
               planFinishTime:''
            },
            value2:[],
            formLabelWidth: '80px',
              rules: {
                orderCode: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                productCode:[
                     { required: true, message: '请输入', trigger: 'blur' },
                ],
                 model:[
                     { required: true, message: '请输入', trigger: 'blur' },
                ],
                 planYield:[
                     { required: true, message: '请输入', trigger: 'blur' },
                     {
                        validator(rule, value, callback) {
                        var reg = /^[0-9][0-9]*$/
                        if (reg.test(value)) {
                            callback()
                        } else {
                            callback(new Error('数量必须为整数'))
                        }
                        },
                        trigger: 'change'
                    }
                ],
                 planFinishTime:[
                     { required: true, message: '请输入', trigger: 'blur' },
                ],
            }
        }
    },
    created(){
       
    },
    methods: {
      beforeRemove(file, fileList) {
         this.testbillList.map((item,index)=>{
             if(item.uid===file.uid || item.technology ===file.url){
                 this.testbillList.splice(index,1)
             }
         })
         console.log(this.testbillList)
      },
      handleSuccess(res, file) {
        this.after++
        this.testbillList.push({technologyName:file.name,uid:file.uid})
        if(this.after ===this.before){
          this.ossParamskey.map((item,index)=>{
            this.testbillList[index].technology = this.host + '/' + item
          })

        }
      },
      beforeUpload: async function (file) {
        this.before++
        await this.backOssInfo(file);
      },
     
      exceed(files, fileList) {
      
        this.$message.error('最多只能上传5个文件！');
      },
      // 获取oss签名数据
     backOssInfo:async function (file) {
        let fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
        return new Promise(
          await function (resolve, reject) {
          onenet.ossInfo().then(
              function (response) {
                if (response === undefined) {
                  this.$message.error(response.error);
                  reject();
                } else {
                  this.ossParams.OSSAccessKeyId = response.accessid;
                  this.ossParams.policy = response.policy;
                  this.ossParams.signature = response.signature;
                  this.ossParams.key = sessionStorage.getItem('userId') + this.randomWord(true, 9, 12) + '.' + fileName;
                  console.log(this.ossParams.key)
                  this.ossParamskey.push(this.ossParams.key)
                  resolve();
                }
              }.bind(this)
            );
          }.bind(this)
        );
      },
      randomWord(randomFlag, min, max) {
        let str = '';
        let range = min;
        let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        // 随机产生
        if (randomFlag) {
          range = Math.round(Math.random() * (max - min)) + min;
        }
        for (let i = 0; i < range; i++) {
          let pos = Math.round(Math.random() * (arr.length - 1));
          str += arr[pos];
        }
        return str;
      },
       changetime(h){
           this.form.planFinishTime = moment(h).format('YYYY-MM-DD')
       },
       close(num){
           this.init()
           this.$emit('close',num)
       },
       getorderid(id){
           orderid(id).then(res=>{
               if(res.code==='0'){
                //    this.value1 = [res.data.planStartTime,res.data.planEndTime]
             
                let a = []
                let b = []
                if(res.data.technology){
                    res.data.technology.split(";").map((item,index)=>{
                        a.push({technology:item,technologyName:res.data.technologyName.split(";")[index],uid:res.data.technologyUuid.split(";")[index]})
                        b.push({url:item,name:res.data.technologyName.split(";")[index]})
                    })
                }
                   this.testbillList = a 
                   this.fileList = b
                   this.form = res.data
               }
           })
       },
       marksure(form){
          this.$refs[form].validate((valid) => {
                if (valid) {
                    this.form.technologyList  = this.testbillList
                    if(this.tit=='新增订单'){
                        orderadd(this.form).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.close('0')
                            } else {
                                this.$message.error(res.msg)
                                this.close('0')
                            }
                        })
                    }else[
                        orderput(this.form).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.close('0')
                            } else {
                                this.$message.error(res.msg)
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
            this.testbillList = []
            this.fileList = []
            this.before = 0
            this.after =0
            this.ossParamskey=[]
       }
    }
}
</script>


<style lang='less'>
    .ordermodal{
        .upload-demo1 {
        
          flex: 1;
        }
        .el-upload {
        width: 104px;
        height: 33px;
        border: none;
       
        border-radius:3px ;
        }
        .el-col{
            margin-bottom: 10px;
        }
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
