<template>
    <div class="recordmodal1">
        <el-dialog :title="tit" :destroy-on-close="isclose" :visible.sync="dialogFormVisible" width="50%" :before-close="beforclose" center>
            <el-row>
                <el-form :model="form" :rules="rules" ref="form">
                    <el-col :span="24" class="dialogTitle">保养设备信息</el-col>
                    <div style="border:1px dashed #ccc;padding:20px 0 5px 0;margin-bottom:20px">
                        <el-col :span="11">
                            <el-form-item label="设备名称" :label-width="formLabelWidth" class="formitem formitem1" prop="category">
                                <el-input placeholder="请输入内容" v-model="form.deviceName" :disabled="true"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="设备编号" :label-width="formLabelWidth" class="formitem formitem1" prop="id">
                                <el-input placeholder="请输入内容" v-model="form.deviceNumer" :disabled="true"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="规格型号" :label-width="formLabelWidth" class="formitem formitem1" prop="period">
                                <el-input placeholder="请输入内容" v-model="form.deviceModel" :disabled="true"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item
                                label="设备类型"
                                v-if="ifEdt"
                                :label-width="formLabelWidth"
                                class="formitem formitem1"
                                prop="toTypeName"
                            >
                                <el-input placeholder="请输入内容" v-model="form.toTypeName" :disabled="true"> </el-input>
                            </el-form-item>
                            <el-form-item label="保养月份" v-else :label-width="formLabelWidth" class="formitem formitem1" prop="toType">
                                <el-input placeholder="请输入内容" v-model="form.monthTime" :disabled="true"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item
                                label="保养时间"
                                v-if="ifEdt"
                                :label-width="formLabelWidth"
                                class="formitem formitem1"
                                prop="dateTime"
                            >
                                <el-input placeholder="请输入内容" v-model="form.dateTime" :disabled="true"> </el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <el-col :span="24" class="dialogTitle">保养内容</el-col>
                    <el-col :span="24">
                        <el-upload :action="host" :data="ossParams" ref="updata" :on-success="handleSuccess"
                            :before-upload="beforeUpload" :limit="limit" class="upload-demo1" 
   :on-remove="handleRemove" :on-preview="handlePictureCardPreview"
                            :on-exceed="exceed" :file-list="fileList" :before-remove="beforeRemove">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                        </el-upload>    
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="formitem formitem1" prop="content">
                            <el-input type="textarea" :rows="3" :disabled="!ifEdt" v-model="form.content"></el-input>
                        </el-form-item>
                    </el-col>
                  
           
        </el-form>
        <el-dialog width="50%" title="查看图片" append-to-body :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" v-if="ifEdt" @click="marksure()" :loading="sureload">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { mainrecordid, mainrecordput } from 'api/main';
import { onenet } from 'api/onenet';
import moment from 'moment';
export default {
    name: 'recordmodal1',

    props: {
        dialogFormVisible: {
            type: Boolean
        },
        tit: {
            type: String
        },
        ifEdt: {
            type: Boolean
        }
    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
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
            isclose: true,
            sureload: false,
            deptlist: [],
            rolelist: [],
            devicelist: [],
            input: '',
            param: {},
            form: {
              deviceName:'',
              id:'',
              deviceNumer:'',
              toType:'',
              dateTime:'',
              content:'',
             
              
            },
             picList:[],
            formLabelWidth: '90px',
            rules: {
                name: [{ required: true, message: '请输入', trigger: 'blur' }]
            },
            timelist: [
                { value: 'year', label: '按年' },
                { value: 'month', label: '按月' }
            ],
            userlist: []
        };
    },
    created() {
        //   this.getdeviceToTypeList()
        //   this.getuserPage()
    },
    mounted() {
    },
    watch: {},
    methods: {
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleSuccess(res, file) {
            var a = this.host + '/' + this.ossParams.key;
             this.picList.push({picName:file.name,picUrl:a})
        },
            // 上传之前的回调
        beforeUpload: async function (file) {
            await this.backOssInfo(file);
            },
         handleRemove(file, fileList) {
          
                this.$message.success('删除成功');
                // this.fileList = [];
                // this.form.picName = '';
                // this.form.picUrl = '';
                this.picList.map((item,index)=>{
                    if(item.picName ===file.name){
                        this.picList.splice(index,1)
                    }
                })
               
            },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        exceed(files, fileList) {
            this.$message.error('最多只能上传五个！');
            },
            // 获取oss签名数据
        backOssInfo: function (file) {
            let fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
            return new Promise(
                function (resolve, reject) {
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
        //查看详情
        getmainrecordid(id) {
            mainrecordid(id).then(res => {
                if (res.code === '0') {
                   
                    this.form = res.data;
                    this.form.monthTime = res.data.dateTime.slice(0, 7);
                    let arr = []
                    let arr1 = []
                     if(res.data.picName){
                         res.data.picName.split(',').map((item,index)=>{
                            arr.push({name:item,url:res.data.picUrl.split(',')[index]})
                            arr1.push({picName:item,picUrl:res.data.picUrl.split(',')[index]})
                        })
                        this.fileList = arr
                        this.picList = arr1
                     }
                     
                     
                }
            });
        },
        close(num) {
            this.init();
            this.$emit('close', num);
        },
       close(num){
           this.init()
           this.$emit('close',num)
       },
       //初始化
       init(){
           this.form= {
              deviceName:'',
              id:'',
              deviceNumer:'',
              toType:'',
              dateTime:'',
              content:''
            }
            this.fileList = []
       },
       marksure(){
           this.param.id = this.form.id
           this.param.content = this.form.content
           this.param.picList = this.picList
            mainrecordput(this.param).then(res=>{
                if(res.code==='0'){
                    this.$message.success(res.msg)
                    this.close('0')
                }
            });
        },
        beforclose() {
            this.init();
            this.$emit('close', false);
        }
    }
};
</script>

<style lang="less">
.recordmodal1 {
    .el-dialog {
        border-radius: 5px;
    }
    .el-dialog__header {
        background-color: #409baf;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        .el-dialog__title {
            color: #fff;
            letter-spacing: 2px;
        }
        .el-dialog__headerbtn .el-dialog__close {
            color: #fff;
        }
    }
    .upload-demo1 {
      padding: 10px;
    }
    .el-upload {
      width: 80px;
      height: 32px;
      border: none;
    }
    .dialogTitle {
        margin-left: 20px;
        font-size: 15px;
        font-weight: 600;
        // color: #409BAF
    }
    .dialog-footer {
        text-align: end;
    }
    .el-form {
        display: flex;
        flex-wrap: wrap;
    }
    .el-select {
        width: 100%;
    }
    .el-col {
        margin-bottom: 20px;
    }
}
</style>
