<template>
  <div class="assignment">
       <div class="top">
          
              <el-form :model="seachinfo"  ref="seachinfo"  class="demo-ruleForm">
              <el-row type="flex" justify="end">
                <div style="flex:1">
                        <el-button type="add"  icon='el-icon-circle-plus-outline' @click="add">批量派单</el-button>
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
                <el-col :span="3" style="margin-right:10px">
                    <el-form-item label=""  prop="zhNumberOrProductCode" >
                        <el-input  placeholder="请输入臻航号或货品编码" v-model="seachinfo.zhNumberOrProductCode"> </el-input>
                    </el-form-item>
                    
                </el-col>
               <div style="margin:0 15px">
                        <el-button type="add" icon="el-icon-search" @click="seachinfo1">搜索</el-button>
                        <el-button type="success" icon="el-icon-refresh-right" @click="resetting">重置</el-button>
               </div>
            </el-row>
            </el-form>
          
     </div>
      <div class="bot">
           <el-table
                :data="tableData"
                stripe
                ref="table"
                border
                :row-key="getRowKeys"
                 @selection-change="handleSelectionChange"
                :height="screenWidth"
               >
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
                    :width="item.width"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                >
                 </el-table-column>
                  <el-table-column
                    label="状态"
                    align="center"
                    width="100">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span v-if="scope.row.state=='1' " style="color:rgb(40,176,40);font-weight:600">{{scope.row.produceTaskPlanState}}</span>
                            <span v-if="scope.row.state=='2' " style="color:rgb(255,153,19);font-weight:600">{{scope.row.produceTaskPlanState}}</span>
                            <span v-if="scope.row.state=='3' " style="color:rgb(69,79,201);font-weight:600">{{scope.row.produceTaskPlanState}}</span>
                            <span v-if="scope.row.state=='4' " style="color:rgb(231,52,58);font-weight:600">{{scope.row.produceTaskPlanState}}</span>
                            <span v-if="scope.row.state=='5' " style="color:rgb(143,143,143);font-weight:600">{{scope.row.produceTaskPlanState}}</span>
                              <span v-if="scope.row.state=='7' " style="color:rgb(143,143,143);font-weight:600">{{scope.row.produceTaskPlanState}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="进度"
                    width="55">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span style="color:rgb(40,176,40)">{{ scope.row.produceProgress }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="用时"
                    width="50">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span v-if='scope.row.produceDuration'>{{ scope.row.produceDuration }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="195" >
                            <template slot-scope="scope">
                               
                                <el-button
                                    type="success"
                                    v-if="scope.row.state=='3' && $_has('assignmentRepeat') "
                                    plain
                                    @click="handleagin(scope.$index, scope.row)"
                                >重新派单</el-button>
                              
                                <el-button
                                    type="warning"
                                     v-if="(scope.row.state=='3' || scope.row.state=='4' || scope.row.state=='5')&& $_has('assignmentReport') "
                                    plain
                                    @click="handleUntie(scope.$index, scope.row)"
                                >报工记录</el-button>
                                <el-button
                                    type="add"
                                    plain
                                     v-if="(scope.row.state=='1'||scope.row.state=='7' )&&$_has('assignmentPlan') "
                                    class="red"
                                    @click="handlesplit(scope.$index, scope.row)"
                                >工单分解</el-button>
                                 <el-button
                                    type="info"
                                     v-if="scope.row.state=='2' && $_has('assignmentUpdate') "
                                    plain
                                    @click="handleEdit(scope.$index, scope.row)"
                                >修改</el-button>
                                <el-button
                                    type="danger"
                                    plain
                                     v-if="(scope.row.state=='1'||scope.row.state=='7')&& $_has('assignmentAssign') "
                                    class="red"
                                    @click="handledistribute(scope.$index, scope.row)"
                                >派单</el-button>
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
      <assingModal :dialogFormVisible='dialogFormVisible' :tit='tit' @close='close' ref='assignmodal'/>
      <recordmodal :dialogFormVisible1='dialogFormVisible1' @close1='close1' ref='recordmodal'/>
  </div>
</template>

<script>
import { produceTaskPlanpage,produceTaskStateList} from 'api/index'
import assingModal from './assignModal'

import moment from 'moment'
import recordmodal from './recordmodal'
import { mapState } from 'vuex'
export default {
    name: 'assignment',
    components:{
        assingModal,recordmodal
    },
    computed:{
        ...mapState(['screenHeight'])
    },
    watch: {
        screenHeight (newVal, oldVal) {
            if(newVal){
                this.screenWidth = (newVal-200) + 'px'
            }
        }
    },
    mounted(){
           
    },
    data() {
        return {
            screenWidth:(document.body.clientHeight-215) + 'px',
            value:'',
            value1:[],
            page:{
                current	:1,
                size:10,
            },
            tableData:[],
            columnlist:[{prop:'index',label:'序号',width:'50'},
               
                {prop:'deptName',label:'部门'},
                {prop:'taskNumber',label:'工单号'},
                {prop:'zhNumber',label:'臻航号'},
                {prop:'productCode',label:'货品编码'},
                {prop:'partNumber',label:'元件编号'},
                {prop:'partCode',label:'部件编码'},
                {prop:'stWorkprocess',label:'发料工序'},
            
                // {prop:'itemName',label:'物料名称/工艺'},
                // {prop:'itemCode',label:'物料编码'},
                // {prop:'model',label:'规格型号',},
                {prop:'planYield',label:'计划生产量',width:'95'},
                {prop:'planStartTime',label:'开始时间',width:'90'},
                {prop:'planEndTime',label:'结束时间',width:'90'},
                {prop:'deviceName',label:'生产设备',width:'90'},
                {prop:'executeUserName',label:'生产人',width:'70'},],
            pagesize:1,
            totals:0,
            dialogFormVisible:false,
            dialogFormVisible1:false,
            tit:'',
            seachinfo:{
                beginDate:'',
                endDate:'',
                state:'',
                zhNumberOrProductCode:''
            },
            orderlist:[],
            multipleSelection:[]
            
        }
    },
    created(){
        this.getproduceTaskPlanpage()
        this.getproduceTaskStateList()
    },
    methods: {
        selectEnable(row, rowIndex) {
         
            if (row.state=='1') {
                return true
            } else {
                return false// 不禁用
            }
        },
        handleSelectionChange(val){
           
            this.multipleSelection  = val
        },
         getRowKeys(row){
          
            return row.produceTaskPlanId
        },
         // 查询状态
        getproduceTaskStateList(){
            produceTaskStateList().then(res=>{
                if(res.code==='0'){
                    this.orderlist = res.data
                }
            })
        },
        changedate(val){
            this.seachinfo.beginDate = moment(val[0]).format('YYYY-MM-DD')
            this.seachinfo.endDate = moment(val[1]).format('YYYY-MM-DD')
        },
        //搜索
        seachinfo1(){
            this.page.current = 1
            this.getproduceTaskPlanpage(this.seachinfo)
        },
        //重置
       resetting(){
           this.seachinfo={
                beginDate:'',
                endDate:'',
                state:'',
                zhNumberOrProductCode:''
            }
            this.value1=[]
            this.page.current = 1
            this.getproduceTaskPlanpage()
       },
     getproduceTaskPlanpage(info){
           let  obj = {...this.seachinfo,...this.page}
         produceTaskPlanpage(obj).then(res=>{
             if(res.code=='0'){
                 res.data.records.map((item,index)=>{
                     item.index= index+1
                     if(item.planStartTime){
                         item.planStartTime = item.planStartTime.split(' ')[0]
                     }
                     if(item.planEndTime){
                         item.planEndTime = item.planEndTime.split(' ')[0]
                     }
                 })
                  this.tableData = res.data.records
                 this.pagesize = parseInt(res.data.current)
                 this.totals = parseInt(res.data.total)
                 this.$forceUpdate
             }
         })
     },
     handleCurrentChange(val){
         this.page.current = val
         this.getproduceTaskPlanpage()
     },
     close(num){
         this.dialogFormVisible = false
         if(num==='0'){
             this.getproduceTaskPlanpage()
         }else if(num==='1'){
             this.getproduceTaskPlanpage()
             this.$refs.table.clearSelection()
         }
     },
     close1(){
         this.dialogFormVisible1 = false
     },
     // 分解
     handlesplit(h,m){
         this.tit = '工单分解'
         this.$refs.assignmodal.getproduceTaskPlanid(m)
         this.dialogFormVisible = true
     },

    // 批量派单

    add(){
        if(this.multipleSelection.length<1){
            this.$message.error('请选择工单')
        }else{
            this.tit = '批量派单'
            this.$refs.assignmodal.getproduceTaskPlanid(this.multipleSelection)
            this.dialogFormVisible = true
        }
        
    },
     // 派单
     handledistribute(h,m){
         this.tit = '派单'
         this.$refs.assignmodal.getproduceTaskPlanid(m)
         this.dialogFormVisible = true
     },
     // 修改
     handleEdit(h,m){
         this.tit = '修改'
         this.$refs.assignmodal.getproduceTaskPlanid(m)
         this.dialogFormVisible = true
     },
     // 重新派单
     handleagin(h,m){
         var that =this
          this.$confirm('请注意，重新派单前请确保当前生产人员已完成报工！', '提示', {
                type: 'warning',
                confirmButtonText: '重新派单',
            })
            .then(() => {
                that.handledistribute(h,m)
               
                
            })
            .catch(() => {});
     },
     // 报工记录
     handleUntie(h,m){
         
         this.$refs.recordmodal.getpageByProduceTaskPlanId(m.produceTaskPlanId,m)
         this.dialogFormVisible1 = true
     }
    }
}
</script>


<style lang='less'>
        .assignment{
             .top{
                height: 50px;
              
                margin-top: 10px;
                .datetime{
                    width:100%
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
