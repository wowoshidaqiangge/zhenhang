<template>
  <div class="ordermodal">
    
    <el-dialog :title="tit" width="65%" :visible.sync="dialogFormVisible" :before-close='beforclose' center>
        <el-row>
           <el-form :model="form" :rules="rules" ref='form'>
               <el-col :span="11" v-if="tit==='修改订单'">
                    <el-form-item label="订单编号" :label-width="formLabelWidth" prop='orderNumber'>
                            <el-input v-model="form.orderNumber" @blur="editseach" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11" v-if="tit==='新增订单'">
                    <el-form-item label="订单编号" :label-width="formLabelWidth" prop='orderNumber'>
                            <el-input v-model="form.orderNumber" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
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
                  <el-col :span="7">
                        <el-form-item  :label-width="formLabelWidth" >
                           <el-button size="small" type="add" @click="addpro">产品新增</el-button>
                        </el-form-item>
                    </el-col>
                     <el-col :span="11">
                      <el-form-item  class="item" >
                          <el-upload 
                            :action="host" 
                            :data="ossParams" 
                            ref="updata" 
                            :on-change="changeupdata" 
                            id="excel-file" 
                            style="margin-top:0"
                            :on-success="handleSuccess"
                            :before-upload="beforeUpload"
                            :before-remove="beforeRemove"
                            :limit="limit" 
                            class="upload-demo1" 
                            multiple
                            :on-exceed="exceed" 
                            :show-file-list="false"
                            >
                              <el-button size="small" type="add" >批量导入</el-button>
                              
                          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                          </el-upload>
                          <span style="position: absolute;top:-8px">
                              <el-popover
                                    placement="top-start"
                                    title="提示"
                                    trigger="hover"
                                    >
                                    <el-link type="primary" href="https://thingcom-test.oss-cn-hangzhou.aliyuncs.com/%E8%87%BB%E8%88%AA-%E8%AE%A2%E5%8D%95-%E6%A8%A1%E6%9D%BF.xls">点此下载模板</el-link>
                                    <i class="el-icon-question" slot="reference" style="color:#409eff"></i>
                                </el-popover></span>
                      </el-form-item>
                    </el-col>
                     <el-col :span="24">
                         <el-table :data="tableData1" border style="width: 100%">
                            <el-table-column
                                v-for="item in columnList"
                                :key="item.id"
                                :prop="item.prop"
                                :label="item.label"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="150"
                            >
                                <template slot-scope="scope">
                                <el-button
                                    type="info"
                                 
                                    plain
                                    @click="handleEdit1(scope.row)"
                                    >修改</el-button
                                >
                                <el-button
                                    type="danger"
                                    plain
                                    class="red"
                                    @click="handledistribute(scope.row)"
                                    >删除</el-button
                                >
                                </template>
                            </el-table-column>
                        </el-table>
                     </el-col>
            </el-form> 
        </el-row>
        <el-dialog
            width="50%"
            :title="tit1"
            :visible.sync="innerVisible"
            append-to-body>
            <el-row>
                <el-form :model="form1" ref="form1" :rules="rules1">
                    <el-col :span="11">
                        <el-form-item label="臻航号" :label-width="formLabelWidth" class="formitem formitem1" prop="zhNumber" >
                            <el-input
                            v-model="form1.zhNumber"   ></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="11">
                        <el-form-item label="客户型号" :label-width="formLabelWidth" class="formitem formitem1" prop="customerModel" >
                            <el-input
                            v-model="form1.customerModel"   ></el-input>
                        </el-form-item>
                    </el-col>
                     <!-- <el-col :span="22">
                        <el-form-item label="客户要求型号" :label-width="formLabelWidth" class="formitem formitem1" prop="customerRequireModel" >
                            <el-input
                            v-model="form1.customerRequireModel"   ></el-input>
                        </el-form-item>
                    </el-col> -->
                     <el-col :span="11">
                        <el-form-item label="制造商" :label-width="formLabelWidth" class="formitem formitem1" prop="manufacturer" >
                            <el-input
                            v-model="form1.manufacturer"   ></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="11">
                        <el-form-item label="订单数量" :label-width="formLabelWidth" class="formitem formitem1" prop="orderCount" >
                            <el-input
                            v-model="form1.orderCount"   @keyup.native='form1.orderCount=form1.orderCount.replace(/[^\d.]/g,"")'></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="11">
                        <el-form-item label="喷涂塑粉" :label-width="formLabelWidth" class="formitem formitem1" prop="sparyPowder" >
                            <el-input
                            v-model="form1.sparyPowder"   ></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="11">
                        <el-form-item label="装箱数" :label-width="formLabelWidth" class="formitem formitem1" prop="encasementCount" >
                            <el-input
                            v-model="form1.encasementCount"   ></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="11">
                        <el-form-item label="滤材" :label-width="formLabelWidth" class="formitem formitem1" prop="filterMaterial" >
                            <el-input
                            v-model="form1.filterMaterial"   ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="22">
                        <el-form-item label="备注1" :label-width="formLabelWidth" class="formitem formitem1" prop="remarkOne" >
                            <el-input
                            v-model="form1.remarkOne"  type="textarea" :rows="1" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="22">
                        <el-form-item label="备注2" :label-width="formLabelWidth" class="formitem formitem1" prop="remarkTwo" >
                            <el-input
                            v-model="form1.remarkTwo"   type="textarea" :rows="1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="22">
                        <el-form-item label="备注3" :label-width="formLabelWidth" class="formitem formitem1" prop="remarkThree" >
                            <el-input
                            v-model="form1.remarkThree"  type="textarea" :rows="1" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>

            <div slot="footer" class="dialog-footer">
            <el-button @click="close1">取 消</el-button>
            <el-button type="primary" @click="marksure1"
                >确 定</el-button
            >
            </div>
      </el-dialog>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="marksure('form')">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { produceTask,produceTaskid,produceTaskput } from 'api/index'
import { producetaskorderExcel,getDetailListByOrderNumber} from 'api/main'

import { onenet } from 'api/onenet';
import {orderadd,orderid,orderput} from 'api/main'
import xlsx from 'xlsx';
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
            tit1:'产品新增',
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
             rules1: {
            
                },
            formLabelWidth: '110px',
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
                     { required: true, message: '请输入日期', trigger: 'blur' },
                ],
                orderNumber:[
                     { required: true, message: '请输入订单编号', trigger: 'blur' },
                ],
            },
            innerVisible:false,
            form1:{
            },
            tableData1:[],
            columnList:[
                {prop:'index',label:'序号'},
                {prop:'zhNumber',label:'臻航号'},
                {prop:'customerModel',label:'客户型号'},
                // {prop:'customerRequireModel',label:'客户要求型号'},
                {prop:'manufacturer',label:'制造商'},
                {prop:'orderCount',label:'订单量'},
                {prop:'sparyPowder',label:'喷涂塑粉'},
                {prop:'encasementCount',label:'装箱数'},
                {prop:'filterMaterial',label:'滤材'},
                {prop:'remarkOne',label:'备注1'},
                {prop:'remarkTwo',label:'备注2'},
                {prop:'remarkThree',label:'备注3'},
            ],
            issuccess:false
        }
    },
    created(){
       
    },
    methods: {
    changeupdata(file) {
           
            if(!this.issuccess){
                let fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
            let that = this;
            if (fileName != 'xls' && fileName != 'xlsx') {
                this.$refs.upload.clearFiles();
                this.$message({
                    type: 'error',
                    showClose: true,
                    duration: 3000,
                    message: '不是excel文件'
                });
            } else {
                var fileReader = new FileReader();
                fileReader.onload = function(ev) {
                    console.log(ev, 'ev');
                    try {
                        var data = ev.target.result,
                            workbook = xlsx.read(data, {
                                type: 'binary'
                            }), // 以二进制流方式读取得到整份excel表格对象
                            persons = []; // 存储获取到的数据
                    } catch (e) {
                        console.log('文件类型不正确');
                        return;
                    } // 表格的表格范围，可用于判断表头是否数量是否正确
                    var fromTo = ''; // 遍历每张表读取
                    console.log(workbook);
                    for (var sheet in workbook.Sheets) {
                        if (workbook.Sheets.hasOwnProperty(sheet)) {
                            fromTo = workbook.Sheets[sheet]['!ref'];
                            persons = persons.concat(xlsx.utils.sheet_to_json(workbook.Sheets[sheet])); // break; // 如果只取第一张表，就取消注释这行
                             console.log(workbook.Sheets[sheet],xlsx.utils.sheet_to_json(workbook.Sheets[sheet]));
                        }
                    }
                   
                    that.deliver(persons);
                }; // 以二进制方式打开文件
                fileReader.readAsBinaryString(file.raw);
            }
            }
        },
        getval(obj,name){
            let val = ''
            Object.keys(obj).map((item=>{
                if(item.indexOf(name)!=-1){
                    val = obj[item]
                }
            }))
            return val
        },
        deliver(val) {
            // console.log(val)
           
             let arr = []
                val.map((item,index)=>{
                    if(index>2){
                        let obj = {}
                        obj.customerModel = this.getval(JSON.parse(JSON.stringify(item)),"_2")
                        obj.zhNumber = this.getval(JSON.parse(JSON.stringify(item)),"_3")
                         obj.manufacturer = this.getval(JSON.parse(JSON.stringify(item)),"_4")
                        obj.orderCount =this.getval(JSON.parse(JSON.stringify(item)),"_5")
                        obj.sparyPowder = this.getval(JSON.parse(JSON.stringify(item)),"_6")
                        obj.encasementCount = this.getval(JSON.parse(JSON.stringify(item)),"_14")
                        obj.filterMaterial = this.getval(JSON.parse(JSON.stringify(item)),"_15")
                        obj.remarkOne = this.getval(JSON.parse(JSON.stringify(item)),"_16")
                        obj.remarkTwo = this.getval(JSON.parse(JSON.stringify(item)),"_17")
                        obj.remarkThree = this.getval(JSON.parse(JSON.stringify(item)),"_18")
                        // obj.manufacturer = JSON.parse(JSON.stringify(item))["__EMPTY_4"]
                        // obj.orderCount = JSON.parse(JSON.stringify(item))["__EMPTY_5"]
                        // obj.sparyPowder = JSON.parse(JSON.stringify(item))["__EMPTY_6"]
                        // obj.encasementCount = JSON.parse(JSON.stringify(item))["__EMPTY_14"]
                        // obj.filterMaterial = JSON.parse(JSON.stringify(item))["__EMPTY_15"]
                        // obj.remarkOne = JSON.parse(JSON.stringify(item))["__EMPTY_16"]
                        // obj.remarkTwo = JSON.parse(JSON.stringify(item))["__EMPTY_17"]
                        // obj.remarkThree = JSON.parse(JSON.stringify(item))["__EMPTY_18"]
                        arr.push(obj)
                    }
                })
          
          
            let arr1 = []
            for (let i=0;i<arr.length;i++){
                if(arr[i].customerModel=='合计'|| arr[i].zhNumber=='合计'|| !arr[i].zhNumber ){
                   break 
                }
                 arr[i].index = i+1
                 if(!arr[i].sparyPowder&&arr[i-1].sparyPowder){
                        arr[i].sparyPowder = arr[i-1].sparyPowder
                 }
                 if(!arr[i].encasementCount&&arr[i-1].encasementCount){
                        arr[i].encasementCount = arr[i-1].encasementCount
                 }
            
                 if(!arr[i].customerModel&&arr[i-1].customerModel){
                        arr[i].customerModel = arr[i-1].customerModel
                 }
                 arr1.push(arr[i])
            }
            // arr.forEach((item,index)=>{
                
                
            // })
        
            this.tableData1 = arr1
        },
        
        // 修改产品
     editseach(){
         let obj = {orderNumber:this.form.orderNumber}
         getDetailListByOrderNumber(obj).then(res=>{
            
             if(res.code==='0'){
                 res.data.map((item,index)=>{
                     item.index = index + 1
                 })
                 this.tableData1 = res.data
                 if(res.data&&res.data[res.data.length-1].planFinishTime){
                     this.form.planFinishTime = res.data[res.data.length-1].planFinishTime
                 }
                 
             }else{
                 this.$message.error(res.msg)
             }
         })
     },
      beforeRemove(file, fileList) {
         this.testbillList.map((item,index)=>{
             if(item.uid===file.uid || item.technology ===file.url){
                 this.testbillList.splice(index,1)
             }
         })
         console.log(this.testbillList)
      },
      handleSuccess(res, file) {
          this.issuccess = true
       
        this.after++
        this.testbillList.push({technologyName:file.name,uid:file.uid})
        if(this.after ===this.before){
          this.ossParamskey.map((item,index)=>{
            this.testbillList[index].technology = this.host + '/' + item
          })
        }
      },
      beforeUpload: async function (file) {
        this.issuccess = false
         
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
        //    orderid(id).then(res=>{
        //        if(res.code==='0'){
        //         //    this.value1 = [res.data.planStartTime,res.data.planEndTime]
        //         let a = []
        //         let b = []
        //         if(res.data.technology){
        //             res.data.technology.split(";").map((item,index)=>{
        //                 a.push({technology:item,technologyName:res.data.technologyName.split(";")[index],uid:res.data.technologyUuid.split(";")[index]})
        //                 b.push({url:item,name:res.data.technologyName.split(";")[index]})
        //             })
        //         }
        //            this.testbillList = a 
        //            this.fileList = b
        //            this.form = res.data
        //        }
        //    })
       },
       marksure(form){
           this.tableData1.map((item)=>{
               item.orderNumber = this.form.orderNumber
               item.planFinishTime = this.form.planFinishTime
               item.fileList = JSON.stringify(this.testbillList)
           })
          this.$refs[form].validate((valid) => {
                if (valid) {
                    // this.form.technologyList  = this.testbillList
                    if(this.tit=='新增订单'){
                        // orderadd(this.form).then(res=>{
                        //     if(res.code==='0'){
                        //         this.$message.success(res.msg)
                        //         this.close('0')
                        //     } else {
                        //         this.$message.error(res.msg)
                        //         this.close('0')
                        //     }
                        // })
                        //  this.close(this.tableData1)
                   
                        producetaskorderExcel(this.tableData1).then(res=>{
                                 if(res.code==='0'){
                                    this.$message.success(res.msg)
                                    this.close('0')
                                } else {
                                    this.$message.error(res.msg)
                                    this.close('0')
                                }
                        })
                    }else[
                        orderput(this.tableData1).then(res=>{
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
       addpro(){
           this.innerVisible = true
       },
       marksure1(){
           
           if(this.tit1 === '产品新增'){
               this.tableData1.push(this.form1)
               this.tableData1.map((item,index)=>{
                   item.index = index+1
               })
               this.form1 = {}
           }else {
               this.tableData1.map((item,inx)=>{
                   if(item.index===this.form1.index){
                      this.$set(this.tableData1,inx,this.form1)
                   }
               })
          
           }
           this.innerVisible=false
       },
        handleEdit1(val){
          this.tit1 = '产品修改'
          this.innerVisible=true
          let pro = JSON.parse(JSON.stringify(val))
          this.form1 = pro
       },
       handledistribute(val){
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                this.$message.success('删除成功');
                let arr = this.tableData1;
                
                this.tableData1.map((item, index) => {
                    if (item.index === val.index) {
                    arr.splice(index, 1);
                    }
                });
                this.tableData1 = arr
                })
                .catch(() => {});
        
       },
       close1(){
           this.innerVisible = false
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
            this.tableData1 = []
            this.issuccess = false
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
        width: 104px !important;
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
    .el-dialog {
  border-radius: 5px;
}
.el-dialog__header {
  background-color: #409baf;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: center;
  .el-dialog__title {
    color: #fff;
    letter-spacing: 2px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}

.dialog-footer {
  text-align: end;
}

</style>
