<template>
  <div class="order">
      <div class="top">
              <el-form :model="seachinfo"  ref="seachinfo"  class="demo-ruleForm">
              <el-row type='flex' justify="end">
                <div style="flex:1">
                    <el-button type="add" v-if="$_has('orderAdd')" icon='el-icon-circle-plus-outline' @click="add">选中审核</el-button>
                    
                </div>
                <el-col :span="5">
                    <el-form-item label="" prop="value1">
                            <el-date-picker
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                @change="changedate"
                                class="datetime"
                                end-placeholder="结束日期">
                            </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="2" style="margin:0 20px">
                    <el-form-item label=""  prop="state" >
                        <el-select v-model="seachinfo.state"  placeholder="状态" >
                            <el-option
                                v-for="item in orderlist"
                                :key="item.enumKey"
                                :label="item.enumValue"
                                :value="item.enumKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label=""  prop="orderNumberOrZhNumber" >
                        <el-input  placeholder="请输入订单号或臻航号" v-model="seachinfo.orderNumberOrZhNumber" class="elinput"> </el-input>
                    </el-form-item>

                </el-col>
                <div style="margin:0 15px">
                    <el-button type="add" icon="el-icon-search" @click="seachinfo1">搜索</el-button>
                    <el-button type="success" icon="el-icon-refresh-right" @click="resetting">重置</el-button>
                </div>
              </el-row>
            </el-form>
          
     </div>
     <div>
             <el-table
                :data="tableData"
                ref="table"
                stripe
                :height='screenWidth'
                :span-method="objectSpanMethod"
               :row-key="getRowKeys"
                 @selection-change="handleSelectionChange"
              
                border
                style="width: 100%">
                <el-table-column
                    type="selection"
                    :selectable='selectEnable'
                    :reserve-selection="true"
                    align="center"
                    width="50">
                </el-table-column>
                <el-table-column
                    v-for="(item,index) in columnlist"
                    :key="index"
                    :fixed="item.fixed"
                    :width="item.width"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    label="状态"
                   
                    >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span  style="color:rgb(40,176,40);font-weight:600">{{ scope.row.stateName }}</span>
                            <!-- <span v-if="scope.row.state==1 " style="color:rgb(40,176,40);font-weight:600">{{ scope.row.stateName }}</span>
                            <span v-if="scope.row.state=='2' " style="color:rgb(255,153,19);font-weight:600">{{ scope.row.stateName }}</span>
                            <span v-if="scope.row.state=='3' " style="color:rgb(69,79,201);font-weight:600">{{ scope.row.stateName }}</span>
                            <span v-if="scope.row.state=='4' " style="color:rgb(231,52,58);font-weight:600">{{ scope.row.stateName }}</span>
                            <span v-if="scope.row.state=='5' " style="color:rgb(143,143,143);font-weight:600">{{ scope.row.stateName }}</span> -->
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="进度"
                   
                    align="center"
                    >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span style="color:rgb(40,176,40)">{{ scope.row.produceProgress }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="用时"
                   
                    align="center"
                    >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span v-if='scope.row.produceDuration'>{{ scope.row.produceDuration }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="工艺文件"
                   
                     width="160" 
                     align="center"
                    >
                    <template slot-scope="scope">
                     
                     <el-upload 
                            :action="host" 
                            :data="ossParams" 
                            ref="updata" 
                            :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, scope.row)"
                            :before-upload="beforeUpload"
                            :before-remove="beforeRemove"
                            :limit="limit" 
                            class="upload-demo1" 
                            multiple
                            :on-exceed="exceed" 
                            :show-file-list="false"
                            >
                              <el-button size="small" type="success" >添加</el-button>
                          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                          </el-upload>
                     <el-button
                         type="warning"
                         style="margin-top:6px"
                         @click="lookfile(scope.row)"
                         plain
                     >查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="210" >
                             <template slot-scope="scope">
                                <el-button
                                    type="success" 
                                    v-if="(scope.row.state=='3' || scope.row.state=='2' ||scope.row.state=='1'  ) && $_has('orderLock') "
                                    plain
                                    @click="handleUntie(5, scope.row.id)"
                                >锁定</el-button>
                                <el-button
                                    type="warning"
                                     v-if="scope.row.state=='5' && $_has('orderUnLock') "
                                    plain
                                    @click="handleUntie(6, scope.row.id)"
                                >解锁</el-button>
                                <el-button
                                    type="info"
                                     v-if="scope.row.state=='0'"
                                    plain
                                    @click="handleedit(scope.row)"
                                >修改</el-button>
                                <el-button
                                    type="danger"
                                    plain
                                     v-if="(scope.row.state=='8'  || scope.row.state=='0' || userId=='1') && $_has('orderDelete') "
                                    class="red"
                                    @click="handleDelete(scope.$index, scope.row)"
                                >删除</el-button>
                                 <el-button
                                    type="info"
                                     v-if="(scope.row.state=='8' ) && $_has('orderUpdate') "
                                    plain
                                    @click="handleblack(scope.row)"
                                >驳回原因</el-button>
                            </template>
                    </el-table-column>

            </el-table>
            <div class="page">
                <el-pagination
                    :background='true'
                    :current-page.sync="pagesize"
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next"
                    :total="totals">
                </el-pagination>
            </div>
          </div>
          <checkModal :dialogFormVisible='dialogFormVisible' @close='close' :tit='tit' ref='checkModal'/>
          <fileModel :dialogFormVisiblefile='dialogFormVisiblefile' @closefile='closefile' :titfile='titfile' ref="filemodel"/>
           <editModel :dialogFormVisibleedit='dialogFormVisibleedit' @closeedit='closeedit' :titfile='titedit' ref="editmodel"/>
          
  </div>
</template>

<script>
import { produceTaskdelete } from 'api/index'
import {orderpage,orderdelete,orderTypeList,orderupdateState} from 'api/main'
import moment from 'moment'
import editModel from './editmodel'
import fileModel from './filemodel'
import { getBlob, saveAs, } from '@/utils/util';
import checkModal from './checkmodel'
import { mapState } from 'vuex'
export default {
    name: 'ordercheck',
    components:{
        checkModal,
        fileModel,
        editModel
    },
    computed:{
        ...mapState(['screenHeight'])
    },
    watch: {
        // 监听高度
        screenHeight (newVal, oldVal) {
            if(newVal){
                this.screenWidth = (newVal-200) + 'px'
            }
        }
    },
    data() {
        return {
            dialogFormVisibleedit:false,
            titedit:'修改',
            dialogFormVisiblefile:false,
            titfile:'',
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
             before:0,
            after:0,
            testbillList:[],
            ossParamskey:[],
            dialogFormVisible:false,
            value:'',
            value1:'',
            tit:'',
            page:{
                current:1,
                size:10
            },
            tableData:[],
            columnlist:[
                {prop:'index',label:'序号',width:'50',fixed:true},
                {prop:'orderNumber',label:'订单号',fixed:true},
                {prop:'zhNumber',label:'臻航号',fixed:true},
                {prop:'customerModel',label:'客户型号'},
                // {prop:'customerRequireModel',label:'客户要求写的型号'},
                {prop:'manufacturer',label:'制造商'},

                {prop:'orderCount',label:'订单量'},
                {prop:'produceCount',label:'实际生产量'},
                {prop:'sparyPowder',label:'喷涂塑粉'},
                {prop:'encasementCount',label:'装箱数'},
                {prop:'filterMaterial',label:'滤材'},
                {prop:'remarkOne',label:'备注1'},
                {prop:'remarkTwo',label:'备注2'},
                {prop:'remarkThree',label:'备注3'},
                {prop:'planFinishTime',label:'交货日期',},
                {prop:'createTime',label:'下单日期',},
                {prop:'createUserName',label:'下单人',},
                // {prop:'produceCount',label:'实际生产量',width:'95'},
                // {prop:'planFinishTime',label:'交货时间',width:'90'},
                // {prop:'createTime',label:'创建时间',width:'90'},
                // {prop:'customer',label:'客户名',width:'80'},
                // {prop:'createUserName',label:'下单人',width:'90'},
            ],
            pagesize:1,
            totals:0,
            screenWidth:(document.body.clientHeight-215) + 'px',
            seachinfo:{
                beginDate:'',
                endDate:'',
                state:'',
                orderNumberOrZhNumber:''
            },
            orderlist:[],
            spanArr:[],
            multipleSelection :[],
            multipleSelectionAll:[],
            
            userId:sessionStorage.getItem('userId')
        }
    },

    created(){
        this.getorderpage()
        this.getorderTypeList()
    },
    methods: {
        handleSelectionChange(val) {
    // 获取勾选的全部数据 
         this.multipleSelection  = val
        
           
        },
        getRowKeys(row){
          
            return row.id
        },
        handleedit(val){
            this.dialogFormVisibleedit = true
            this.$refs.editmodel.getall(val)
        },
        closeedit(num){
            this.dialogFormVisibleedit = false
            if(num==='0'){
                 this.getorderpage()
            }
        },
        closefile(){
            this.dialogFormVisiblefile = false
        },
        updateTechnologyByOrderNumber(id,val){
            let obj = {orderNumber:id,fileList:JSON.stringify(val)}
            updateTechnologyByOrderNumber(obj).then(res=>{
                if(res.code==='0'){
                    this.$message.success(res.msg)
                    this.testbillList = []
                    this.getorderpage()
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
      },
      handleSuccess(response, file, fileList, scope) {
        
        this.after++
        this.testbillList.push({technologyName:file.name,uid:file.uid})
        if(this.after ===this.before){
          this.ossParamskey.map((item,index)=>{
            this.testbillList[index].technology = this.host + '/' + item
          })
           console.log(this.testbillList)
           let pro = []
           let arr = []
           if(scope.fileList){
                pro =  JSON.parse(scope.fileList)
                arr = [...pro,...this.testbillList]
           }else{
                arr = this.testbillList
           }
           console.log(arr)
            this.updateTechnologyByOrderNumber(scope.orderNumber,arr)
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
       lookfile(val){
        
            let pro = ''
            if(val.fileList){
                pro = JSON.parse(val.fileList)
            }
            
            if(pro&&pro.length==1){
                
                getBlob(pro[0].technology).then(blob => {
                    saveAs(blob, pro[0].technologyName);
                });
            }else if(pro&&pro.length>1){
                this.titfile = '查看工艺'
                this.$refs.filemodel.getall(pro)
                this.dialogFormVisiblefile = true
            }else if(!pro || pro.length<1){
                this.$message.error('暂无文艺文件')
            }
        },
        handleblack(val){
             this.$confirm(`驳回原因：${val.refuteCause}`, '提示', {
                type: 'warning'
            })
            .then(() => {
                   
            })
            .catch(() => {});
        },
        selectEnable(row, rowIndex) {
            if (row.state=='0' || row.state=='7' || row.state=='8') {
                return true
            } else {
                return false// 不禁用
            }
        },
        // handleSelectionChange(val){
           
           
        // },
       
        getSpanArr(data) {　
                this.spanArr = []
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                    this.spanArr.push(1);
                    this.pos = 0
                    } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].orderNumber === data[i - 1].orderNumber) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                    }
                }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if ( columnIndex ===19) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                   
                    return { // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                        rowspan: _row,
                        colspan: _col
                    }
                }
        },
            
        
          // 查询状态
        getorderTypeList(){
            orderTypeList().then(res=>{
                if(res.code==='0'){
                    this.orderlist = res.data
                }
            })
        },
        changedate(val){
            this.seachinfo.beginDate = moment(val[0]).format('YYYY-MM-DD')
            this.seachinfo.endDate = moment(val[1]).format('YYYY-MM-DD')
        },
        seachinfo1(){
            this.page.current = 1
            this.getorderpage(this.seachinfo)
        },
        //重置
        resetting(){
            this.seachinfo={
                beginDate:'',
                endDate:'',
                state:'',
                orderNumberOrZhNumber:''
            }
            this.value1 = ''
            this.page.current = 1
            this.getorderpage()
        },
        getorderpage(info){
           
            let  obj = {...this.seachinfo,...this.page}
            orderpage(obj).then(res=>{
                if(res.code==='0'){
                    res.data.records.map((item,index)=>{
                        item.index = index + 1
                        item.createTime = item.createTime.split(' ')[0]
                    })
                    this.getSpanArr(res.data.records)
                   
                    this.tableData = res.data.records
                    
                    this.pagesize = parseInt(res.data.current)
                    this.totals = parseInt(res.data.total)
                    //  setTimeout(()=>{
                    //         this.setSelectRow();
                    //     }, 200)
                }
            })
        },
        handleCurrentChange(val){
            
            this.page.current=val
            this.getorderpage()
        },
        add(){
            let tabnum = []
            const h = this.$createElement;
            this.multipleSelection.map((item,index)=>{
                tabnum.push(item.orderNumber)
            })
            
            tabnum = this.unique(tabnum)
           
            let a = tabnum.toString()
            if(tabnum.length>1){
                 this.$msgbox({
                    type: 'warning',
                    title:'提示',
                    message: h('p', null, [
                        h('div',{ style: 'font-size: 15px' }, '请注意！只能选择同一订单号进行批量审批！ '),
                        h('span', { style: 'color: teal' }, `已选中订单: ${a}`)
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                })
                .then(() => {}).catch(() => {});
            }else if(tabnum.length < 1){
                this.$message.error('请选择订单')
                return
            } else{
                this.tit = '批量审核'
                this.$refs.checkModal.getall(this.multipleSelection)
                this.dialogFormVisible = true
            }
            
        },
        unique(arr) {
            return Array.from(new Set(arr))
        },
        close(num){
            this.dialogFormVisible = false
            if(num==='0'){
                
                this.getorderpage()
                this.$refs.table.clearSelection()
            }
        },
        handleEdit(h,m){
             this.tit = '编辑订单'
             this.$refs.checkModal.getorderid(m)
             this.dialogFormVisible = true
        },
        handleDelete(h,m){
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                     orderdelete(m).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.getorderpage()
                            }
                        })
            })
            .catch(() => {});

        },
        // 锁定解锁
        handleUntie(h,m){
            var obj = {id:m,state:h}
            orderupdateState(obj).then(res=>{
                if(res.code==='0'){
                    this.$message.success(res.msg)
                    this.getorderpage()
                }
            })
        }
    }
}
</script>

<style lang='less'>
    .order{
         .upload-demo1 {
          float:left;
          flex: 1;
          margin-top:6px
        }
        .el-upload {
        width: 60px;
        height: 33px;
        border: none;
        border-radius:3px ;
        }
         .top{
                height: 50px;
                margin-top: 10px;

                .datetime{
                   width: 100%;
                }
            }


            .page{
                margin-top: 10px;
                float: right;
            }
            .el-pager li.active{
                background-color: #409baF !important;
                color: #fff;
            }
    }
</style>
