<template>
  <div class="production">
      <div class="top" >
              <el-form :model="seachinfo"  ref="seachinfo"  class="demo-ruleForm">
              <el-row type="flex" justify="end">
                    <div style="flex:1">
                        <el-button type="add" v-if="$_has('productionAdd')" icon='el-icon-circle-plus-outline' @click="add">新增</el-button>
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
                        <el-form-item label=""  prop="zhNumberOrTaskNumber" >
                            <el-input  placeholder="臻航号或任务单号" v-model="seachinfo.zhNumberOrTaskNumber" class="elinput"> </el-input>
                        </el-form-item>
                        
                    </el-col>
                    <div style="margin:0 15px">
                            <el-button type="add" icon="el-icon-search" @click="seachinfo1">搜索</el-button>
                            <el-button type="success" icon="el-icon-refresh-right" @click="resetting">重置</el-button>
                    </div>
                    </el-row>
                </el-form>
                
            </div>
            <div  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
             <el-table
                :data="tableData"
                stripe
                :height='screenWidth'
                border
                style="width: 100%">

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
                    width="90">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span v-if="scope.row.state=='1' " style="color:rgb(40,176,40);font-weight:600">{{ scope.row.produceTaskState }}</span>
                            <span v-if="scope.row.state=='2' " style="color:rgb(255,153,19);font-weight:600">{{ scope.row.produceTaskState }}</span>
                            <span v-if="scope.row.state=='3' " style="color:rgb(69,79,201);font-weight:600">{{ scope.row.produceTaskState }}</span>
                            <span v-if="scope.row.state=='4' " style="color:rgb(231,52,58);font-weight:600">{{ scope.row.produceTaskState }}</span>
                            <span v-if="scope.row.state=='5' " style="color:rgb(143,143,143);font-weight:600">{{ scope.row.produceTaskState }}</span>
                           
                            <span v-if="scope.row.state=='7' " style="color:rgb(143,143,143);font-weight:600">{{ scope.row.produceTaskState }}</span>
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
                <el-table-column label="操作" width="210" >
                            <template slot-scope="scope">
                                <el-button
                                    type="success"
                                    v-if="(scope.row.state=='3' || scope.row.state=='2' ||scope.row.state=='1' || scope.row.state=='7') && $_has('productionLock') "
                                    plain
                                    @click="handleUntie(5, scope.row)"
                                >锁定</el-button>
                                <el-button
                                    type="warning"
                                     v-if="scope.row.state=='5' && $_has('productionUnlock') "
                                    plain
                                    @click="handleUntie(6, scope.row)"
                                >解锁</el-button>
                                 <el-button
                                    type="info"
                                     v-if="(scope.row.state=='1' || scope.row.state=='2' ||scope.row.state=='3'||scope.row.state=='7') && $_has('productionDetail')"
                                    plain
                                    @click="handleEdit(scope.$index, scope.row)"
                                >详情</el-button>
                                <el-button
                                    type="danger"
                                    plain
                                     v-if="(scope.row.state=='1' || scope.row.state=='2' || scope.row.state=='7') && $_has('productionDelete')"
                                    class="red"
                                    @click="handleDelete(scope.$index, scope.row)"
                                >删除</el-button>
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
          <Modal :dialogFormVisible='dialogFormVisible' @close='close' :tit='tit' />
          <editmodal :dialogFormVisibledit='dialogFormVisibledit' @close='close' :tit='tit' ref='promodal'/>
  </div>
</template>

<script>
import { produceTaskpage,produceTaskdelete,updateProduceTaskLockById,produceTaskStateList } from 'api/index'
import Modal from './modal'
import moment from 'moment'
import editmodal from './proeditmodal'
import { mapState } from 'vuex'
export default {
    name: 'production',
    components:{
        Modal,editmodal
    },
    computed:{
        ...mapState(['screenHeight'])
    },
    watch: {
        // 监听高度
        screenHeight (newVal, oldVal) {
            if(newVal){
                this.screenWidth = (newVal-210) + 'px'
            }
        }
    },
    data() {
        return {
            loading:false,
            dialogFormVisible:false,
            dialogFormVisibledit:false,
            value:'',
            value1:'',
            tit:'',
            page:{
                current:1,
                size:10
            },
            tableData:[],
            columnlist:[
                {prop:'index',label:'序号',width:'50'},
                {prop:'taskNumber',label:'任务单号'},
                {prop:'zhNumber',label:'臻航号'},
                {prop:'productCode',label:'货品编码'},
                {prop:'customerModel',label:'客户型号'},
                {prop:'orderCount',label:'订单量'},
                {prop:'planYield',label:'计划生产量',width:'95'},
                {prop:'planFinishTime',label:'交货时间',width:'90'},
               
                {prop:'createTime',label:'创建时间',width:'90'},
                {prop:'createUser',label:'下单人'},
            ],
            pagesize:1,
            totals:0,
            screenWidth:(document.body.clientHeight-215) + 'px',
            seachinfo:{
                beginDate:'',
                endDate:'',
                state:'',
                zhNumberOrTaskNumber:''
            },
            orderlist:[]
        }
    },
    created(){
        this.getproduceTaskpage()
        this.getproduceTaskStateList()
    },
    methods: {
        // 查询状态
        getproduceTaskStateList(){
            produceTaskStateList().then(res=>{
                if(res.code==='0'){
                    this.orderlist = res.data
                }
            })
        },
        //重置
        resetting(){
            this.seachinfo = {
                beginDate:'',
                endDate:'',
                state:'',
                zhNumberOrTaskNumber:''
            }
            this.page={
                current:1,
                size:10
            }
            this.value1 = ''
            this.getproduceTaskpage()
        },
        changedate(val){
            this.seachinfo.beginDate = moment(val[0]).format('YYYY-MM-DD')
            this.seachinfo.endDate = moment(val[1]).format('YYYY-MM-DD')
        },
        //搜索
        seachinfo1(){
            this.page.current = 1
           this.getproduceTaskpage(this.seachinfo)
        },
        // 获取列表
        getproduceTaskpage(){
            let  obj = {...this.seachinfo,...this.page}
            this.loading = true
            produceTaskpage(obj).then(res=>{
                if(res.code==='0'){
                    res.data.records.map((item,index)=>{
                        item.index = index + 1
                        // item.planFinishTime = item.planFinishTime.split(' ')[0]
                        // item.planEndTime = item.planEndTime.split(' ')[0]
                        item.createTime = item.createTime.split(' ')[0]
                    })
                    this.tableData = res.data.records
                    this.pagesize = parseInt(res.data.current)
                    this.totals = parseInt(res.data.total)
                }
                this.loading = false
            })
        },
        handleCurrentChange(val){
            this.page.current=val
            this.getproduceTaskpage()
        },
        add(){
            this.tit = '新增任务'
            this.dialogFormVisible = true
        },
        close(num){
            this.dialogFormVisible = false
            this.dialogFormVisibledit = false
            if(num==='0'){
                this.getproduceTaskpage()
            }
        },
        handleEdit(h,m){
             this.tit = '详情'
             this.$refs.promodal.getproduceTaskid(m)
             this.$refs.promodal.getProduceProgress(m)
             
             this.dialogFormVisibledit = true
           
        },
        handleDelete(h,m){
             this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                    produceTaskdelete(m).then(res=>{
                        if(res.code==='0'){
                            this.$message.success(res.msg)
                            this.getproduceTaskpage()
                        }
                    })
            })
            .catch(() => {});
           
        },
        // 锁定解锁
        handleUntie(h,m){
            var obj = {id:m.id,state:h,orderId:m.orderId}
      
            updateProduceTaskLockById(obj).then(res=>{
                if(res.code==='0'){
                    this.$message.success(res.msg)
                    this.getproduceTaskpage()
                }else{
                    this.$message.error(res.msg)
                }
            })
        }
    }
}
</script>

<style lang='less'>
    .production{
         .top{
                height: 50px;
            
                margin-top: 10px;
                .datetime{
                    width: 100%;
                }
            }

            // .elinput{
            //     width: 20%;
            //     margin: 0 2% 0 5px;
            // }
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
