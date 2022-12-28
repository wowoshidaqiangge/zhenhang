<template>
  <div class="assignmodal">
    <el-dialog :title="tit" :visible.sync="dialogFormVisible" :before-close="beforclose" center>
      <p class="modaltit1">工单信息：</p>
      <el-row >
        <el-form :model="form" ref="form" :rules="rules" >
          <el-col :span="24" v-if="tit === '批量派单'" style="margin-bottom:20px">
            <el-table
                  :data="tableData1"
                  stripe
                  border
                >
                  <el-table-column
                      show-overflow-tooltip
                      v-for="(item,index) in columnlist1"
                      :key="index"
                      :width="item.width"
                      :prop="item.prop"
                      :label="item.label"
                      align="center"
                  >
                  </el-table-column>
            </el-table>
          </el-col>
          <el-col v-if="tit !== '批量派单'">
             <el-col :span="24" class="modalcont">
            <el-col :span="11">
              <el-form-item label="生产任务单" :label-width="formLabelWidth" prop="taskNumber">
                <el-input v-model="form.taskNumber" disabled autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="元件编号" :label-width="formLabelWidth" prop="partNumber">
                <el-input v-model="form.partNumber" disabled autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="部件编码" :label-width="formLabelWidth" prop="partCode">
                <el-input v-model="form.partCode" disabled autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="元件名称" :label-width="formLabelWidth" prop="partName">
                <el-input v-model="form.partName" disabled autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="计划产量" :label-width="formLabelWidth" prop="planYield">
                <el-input v-model="form.planYield" disabled autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="发料工序" :label-width="formLabelWidth" prop="stWorkprocess">
                <el-input v-model="form.stWorkprocess" disabled autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24" class="upload-demo" v-if="tit !== '工单分解'">
            <span style="line-height:32px;font-size: 18px;color: #324170;">工艺文件上传:</span>
            <el-upload :action="host" :data="ossParams" ref="updata" :on-success="handleSuccess"
              :before-upload="beforeUpload" :limit="limit" class="upload-demo1" :on-remove="handleRemove"
              :on-exceed="exceed" :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-col>
          </el-col>
          <el-col>  
            <el-form-item label="元件编号：" :label-width="formLabelWidth" >
                    <el-input v-model="partnumber"  autocomplete="off" style="width:40%;margin-right:20px"></el-input>
                    <el-button size="small" type="primary" @click="addpart">点击添加</el-button>
                </el-form-item>
          </el-col>
          <el-col v-if="tit === '派单' || tit === '修改'">
              
              <el-form-item label="关联部件：" :label-width="formLabelWidth" prop="planYield">
                  <div style="border:2px solid #ccc;padding:6px;font-weight:600;min-height:30px">{{parts}}</div>
              </el-form-item>
          </el-col>
          <el-col style="margin-bottom:20px" v-if="tit === '派单' || tit === '修改'">
             <el-table
                  :data="tableData2"
                  stripe
                  border
                  ref="dataTable"
                   @selection-change="handleSelectionChange"
                  :height="300"
                >
                   <el-table-column
                    type="selection"
                    align="center"
                    width="50">
                 </el-table-column>   
                  <el-table-column
                    
                      v-for="(item,index) in columnlist2"
                      :key="index"
                      :width="item.width"
                      :prop="item.prop"
                      :label="item.label"
                      align="center"
                  >
                  </el-table-column>
                   <el-table-column
                    label="部件编码"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span v-if="scope.row.partName">{{ scope.row.partCode }}</span>
                        </div>
                    </template>
                </el-table-column>
                 <el-table-column
                    label="元件名称"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span >{{ scope.row.partName }}</span>
                        </div>
                    </template>
                </el-table-column>
                 <el-table-column
                    label="单位"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span >{{ scope.row.unit }}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
          </el-col>
          <div v-if="tit !== '工单分解'">
            <el-col :span="24" >
              <el-form-item label="计划时间：" :label-width="formLabelWidth" >
                 <el-date-picker
                    v-model="dateval"
                    @change="datechange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
            </el-col>
          </div>
          <div v-if="tit !== '工单分解'">
            <p style="line-height:32px;font-size: 18px;color: #324170;padding:10px 0">请选择派单设备和人员:</p>
            <el-col :span="12">
              <el-form-item label="部门" :label-width="formLabelWidth" prop="userId">
                <el-cascader v-model="form.userId" :options="getuserList" :props="casprops" @change="handleChange">
                </el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="生产设备" :label-width="formLabelWidth" prop="deviceListStr">
                <el-cascader v-model="form.deviceListStr" :options="devicelist" :collapse-tags="true" :props="casprops1">
                </el-cascader>
                <!-- <el-select v-model="form.deviceId" placeholder="请选择">
                                    
                                    <el-option v-for="item in devicelist" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                                </el-select> -->
              </el-form-item>
            </el-col>
          </div>
        </el-form>
        
        <el-col :span="24" v-if="tit === '工单分解'">
          <span>分解工单数:</span>
          <el-input-number v-model="num" @change="handleChange" :min="0" :max="5" style="margin:10px 0 20px 23px">
          </el-input-number>
        </el-col>

        <el-col :span="24" v-if="tit === '工单分解'">
          <span style="line-height:32px">分工单计划产量:</span>
          <div v-for="(item, index) in numlist" :key="index" style="width:10%;display:inline-block;margin-left:17px">
            <el-input v-model="item.value" @change="
                                e => {
                                    changevalue(e, index);
                                }
                            "></el-input>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="marksure('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { produceTaskPlanid, saveProduceTaskPlan, deviceList, userListByDept, produceTaskAssign, deviceListByType,getPartListByZhNumber,getPartListByTaskPlanId } from 'api/index';
import { onenet } from 'api/onenet';
import moment from 'moment';
export default {
  name: 'assignmodal',

  props: {
    dialogFormVisible: {
      type: Boolean
    },
    tit: {
      type: String
    }
  },
  data() {
    return {
      partnumber:'',
      limit: 1,
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
      form: {
        productName: '',
        productCode: '',
        specificationModel: '',
        planYield: '',
        taskNumber: '',
        planStartTime: '',
        planEndTime: '',
        yieldList: [],
        userId: '',
        technologyName: '',
        technology: '',
        deviceListStr:[]
      },
      formLabelWidth: '105px',
      num: 0,
      numlist: [],
      value0: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      devicelist: [],
      getuserList: [],
      casprops: {
        label: 'title',
        value: 'id',
        children: 'userList',
        
      },
      casprops1: {
        label: 'title',
        value: 'id',
        children: 'deviceList',
        multiple: true
      },
      rules: {
        userId: [{ required: true, message: '请选择部门', trigger: 'blur' },],
       
      },
      tableData1:[],
      columnlist1:[
        {prop:'index1',label:'序号'},
       
        {prop:'taskNumber',label:'工单号'},
        {prop:'zhNumber',label:'臻航号'},
        {prop:'partName',label:'元件名称'},
        {prop:'partNumber',label:'元件编号'},
        {prop:'partCode',label:'部件编码'},
        {prop:'stWorkprocess',label:'发料工序'},
        {prop:'planYield',label:'计划生产量'},
      ],
      tableData2:[],
      columnlist2:[
        {prop:'index',label:'序号',width:'60'},
        {prop:'partNumber',label:'元件编号'},
        // {prop:'partCode',label:'部件编号'},
        // {prop:'partName',label:'元件名称'},
        // {prop:'unit',label:'单位'},
        
      ],
      multipleSelection:[],
      parts:'',
      infoway:'',
      dateval:''
    };
  },
  created() {
    // this.getdeviceList();
    this.getuserListByDept();
    this.getdeviceListByType()
  },
  watch: {},

  methods: {
    datechange(val){
      this.form.planStartTime = moment(val[0]).format("YYYY-MM-DD")
      this.form.planEndTime = moment(val[1]).format("YYYY-MM-DD")
    },
    addpart(){
        // let pro = this.tableData2.filter(v=>v.partNumber===this.partnumber)
        // if(pro.length>0){
        //   debugger
        // }
        // this.multipleSelection.push({partNumber:this.partnumber})
        let time = new Date().getTime()
        this.tableData2.push({partNumber:this.partnumber,index:this.tableData2.length+1,productCode:this.infoway.productCode,partCode:time,type:1})
        this.$refs.dataTable.toggleRowSelection(this.tableData2[this.tableData2.length-1]);
        this.$message.success('添加成功')
        this.partnumber = ''
    },
    handleSelectionChange(val){
        
            let arr = []
            // let at = []
            val.map((item)=>{
              arr.push(item.partNumber)
              delete item.id
            })
             this.multipleSelection  = val
            this.parts = arr.toString().replace(/,/g,'、')
    },
    // 所有设备
    getdeviceListByType() {
      deviceListByType().then(res => {
        if (res.code === '0') {
          // debugger
          this.devicelist = res.data;
        }
      })
    },
    handleSuccess(res, file) {
      var a = this.host + '/' + this.ossParams.key;
      this.form.technologyName = file.name;
      this.form.technology = a;
    },
    // 上传之前的回调
    beforeUpload: async function (file) {
      await this.backOssInfo(file);
    },
    handleRemove(file, fileList) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功');
          this.fileList = [];
          this.form.technologyName = '';
          this.form.technology = '';
        })
        .catch(() => { });
    },
    exceed(files, fileList) {
      this.$message.error('最多只能上传一个文件！');
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
    // 设备列表
    getdeviceList() {
      deviceList().then(res => {
        this.devicelist = res.data;
      });
    },
    //获取部门下用户
    getuserListByDept() {
      userListByDept().then(res => {
        if (res.code === '0') {
          this.getuserList = res.data;
        }
      });
    },
    changevalue(value, index) {
      this[`value${index}`] = value.toString();
    },
    // 获取详情
    getproduceTaskPlanid( m) {
     
     
      let pro = ''
      if(Array.isArray(m)){
        m.map((item,index)=>{
          item.index1 = index +1
        })
        this.tableData1 = m
      }else{
         this.infoway = m
      
        this.getPartListByZhNumber(m.productCode)
        setTimeout(()=>{
          this.getPartListByTaskPlanId(m.produceTaskPlanId)
        },0)
         var obj = { id: m.produceTaskPlanId };
          produceTaskPlanid(obj).then(res => {
            res.data.userId = res.data.executeUserId;
            if (res.data.technologyName) {
              this.fileList.push({ name: res.data.technologyName, url: res.data.technology });
            }
            if(res.data.deviceListStr){
              res.data.deviceListStr = JSON.parse(res.data.deviceListStr)
            }
            if(res.data.planStartTime){
              this.dateval = [res.data.planStartTime,res.data.planEndTime]
            }
            
            this.form = res.data;
          });
      }
    },
    // 根据臻航号查询部件
    getPartListByZhNumber(val){
      let obj = {productCode:val}
      getPartListByZhNumber(obj).then(res=>{
        if(res.code==='0'){
          res.data.map((item,index)=>{
            item.index = index +1 
            
          })
          this.tableData2 = res.data
        }
      })
    },
    // 查询选择部件
    getPartListByTaskPlanId(val){
      let obj = {produceTaskPlanId:val}
      let that =this
      getPartListByTaskPlanId(obj).then(res=>{
        if(res.code==='0'){
   
          that.$nextTick(()=>{
              this.toggleRowSelection(res.data)
              // this.$forceUpdate()
          })
        }
      })
    },
    toggleRowSelection(rows){
           rows.forEach(row => {
              let a = this.tableData2.filter(v=>v.partCode==row.partCode)
              console.log(rows.indexOf(row.partCode))
                if(a.length> 0){
                  this.$refs.dataTable.toggleRowSelection(a[0],true);
                 
                }
          })
    },
    handleChange(val) {
      this.getmath(this.form.planYield, val);
      this.num = val;
      let arr = [];
      for (let a = 0; a < val; a++) {
        arr.push({ value: this[`value${a}`] });
      }
      this.numlist = arr;
    },
    //平分工单
    getmath(value, num) {
      for (let a = 0; a < num; a++) {
        if (a == num - 1) {
          this[`value${a}`] = (value - (value % num)) / num + (value % num);
        } else {
          this[`value${a}`] = (value - (value % num)) / num;
        }
      }
    },
    close(num) {
      this.init();
      this.$emit('close', num);
    },

    marksure(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 处理分单
          if (this.tit === '工单分解') {
            let arr = [];
            this.numlist.map((item, index) => {
              arr.push(this[`value${index}`]);
            });
            this.form.yieldList = arr;
            saveProduceTaskPlan(this.form).then(res => {
              if (res.code === '0') {
                this.$message.success(res.msg);
                this.close('0');
              } else {
                this.$message.error(res.msg);
              }
            });
          } else if (this.tit === '派单' || this.tit === '修改' || this.tit==='批量派单') {
            
             let at = []
            if(this.tableData1.length>0){
              debugger
              this.tableData1.map((v)=>{
                  if (Array.isArray(this.form.userId)) {
                    v.deptId = this.form.userId[0];
                    v.userId = this.form.userId[1];
                  }
                  if (Array.isArray(this.form.deviceListStr)) {
                    let arr = []
                    this.form.deviceListStr.map((item)=>{
                      arr.push(item[1])
                    })
                    v.deviceId = arr.toString()
                    v.deviceListStr = JSON.stringify(this.form.deviceListStr)
                  }
                  if(this.form.planStartTime){
                    v.planStartTime = this.form.planStartTime
                    v.planEndTime = this.form.planEndTime
                  }
              })
              at = this.tableData1
            }else{
              if (Array.isArray(this.form.userId)) {
                this.form.deptId = this.form.userId[0];
                this.form.userId = this.form.userId[1];
              }
              if (Array.isArray(this.form.deviceListStr)) {
                let arr = []
                this.form.deviceListStr.map((item)=>{
                  arr.push(item[1])
                })
                this.form.deviceId = arr.toString()
                this.form.deviceListStr = JSON.stringify(this.form.deviceListStr)

              }
              
            
              this.form.partList = this.multipleSelection
              at.push(this.form)
            }
            
            
           
            produceTaskAssign(at).then(res => {
              if(res.code==='0'){
                this.$message.success(res.msg);
                if(this.tit==='批量派单'){
                  this.close('1');
                }else{
                  this.close('0');
                }
                
              }else{
                this.$message.error(res.msg)
              }
            });

          }
        }
      });
    },
    beforclose() {
      this.init();
      this.$emit('close', false);
    },
    init() {
      this.form = {
        productName: '',
        productCode: '',
        specificationModel: '',
        planYield: '',
        taskNumber: '',
        planStartTime: '',
        planEndTime: '',
        yieldList: []
      };
      this.dateval = ''
      this.value0 = '';
      this.value1 = '';
      this.value2 = '';
      this.value3 = '';
      this.value4 = '';
      this.value5 = '';
      this.num = 0;
      this.numlist = [];
      this.tableData1 = []
      this.multipleSelection = []
      this.parts = ''
      this.fileList = [];
      if (this.$refs.updata) {
        this.$refs.updata.clearFiles();
      }
    }
  }
};
</script>

<style lang="less">
.assignmodal {
  .el-dialog {
    border-radius: 5px;
  }
  .el-dialog__header {
    background-color: #409baf;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }
  .dialog-footer {
    text-align: end;
  }
  .modalcont {
    padding: 20px 0;
    border: 1px dashed #aaa;
    margin-bottom: 25px;
   
  }
  .modaltit1 {
    padding: 10px 0;
    font-size: 18px;
    color: #324170;
  }
  .upload-demo {
    margin-bottom: 20px;
    .upload-demo1 {
      padding: 10px;
    }
    .el-upload {
      width: 80px;
      height: 32px;
      border: none;
    }
  }
}
</style>
