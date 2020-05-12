<template>
  <div class="production">
      <div class="top">
              <el-button type="add" icon='el-icon-circle-plus-outline' @click="add">新增</el-button>
               <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    class="datetime"
                    end-placeholder="结束日期">
                </el-date-picker>
               <el-select v-model="value"  placeholder="地址" class="handle-select mr10">
                    
                </el-select>
                <el-input  placeholder="用户名" class="elinput"></el-input>
                <el-button type="add" icon="el-icon-search">搜索</el-button>
     </div>
     <div>
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
                    width="70">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span v-if="scope.row.state=='1' " style="color:rgb(40,176,40);font-weight:600">{{ scope.row.produceTaskState }}</span>
                            <span v-if="scope.row.state=='2' " style="color:rgb(255,153,19);font-weight:600">{{ scope.row.produceTaskState }}</span>
                            <span v-if="scope.row.state=='3' " style="color:rgb(69,79,201);font-weight:600">{{ scope.row.produceTaskState }}</span>
                            <span v-if="scope.row.state=='4' " style="color:rgb(231,52,58);font-weight:600">{{ scope.row.produceTaskState }}</span>
                            <span v-if="scope.row.state=='5' " style="color:rgb(143,143,143);font-weight:600">{{ scope.row.produceTaskState }}</span>
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
                                    v-if="scope.row.state=='3' || scope.row.state=='2' ||scope.row.state=='1' "
                                    plain
                                    @click="handleUntie(5, scope.row.id)"
                                >锁定</el-button>
                                <el-button
                                    type="warning"
                                     v-if="scope.row.state=='5' "
                                    plain
                                    @click="handleUntie(6, scope.row.id)"
                                >解锁</el-button>
                                 <el-button
                                    type="info"
                                     v-if="scope.row.state=='1'"
                                    plain
                                    @click="handleEdit(scope.$index, scope.row)"
                                >修改</el-button>
                                <el-button
                                    type="danger"
                                    plain
                                     v-if="scope.row.state=='1' || scope.row.state=='2'"
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
          <Modal :dialogFormVisible='dialogFormVisible' @close='close' :tit='tit' ref='promodal'/>
  </div>
</template>

<script>
import { produceTaskpage,produceTaskdelete,updateProduceTaskLockById } from 'api/index'
import Modal from './modal'
import { mapState } from 'vuex'
export default {
    name: 'production',
    components:{
        Modal
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
                {prop:'index',label:'序号',width:'50'},
                {prop:'taskNumber',label:'工单号'},
                {prop:'deviceType',label:'部门'},
                {prop:'productName',label:'物料名称'},
                {prop:'productCode',label:'物料编码'},
                {prop:'specificationModel',label:'规格型号',width:'70'},
                {prop:'planYield',label:'计划生产量',width:'95'},
                {prop:'planStartTime',label:'开始时间',width:'90'},
                {prop:'planEndTime',label:'结束时间',width:'90'},
                {prop:'createTime',label:'创建时间',width:'90'},
                {prop:'createUser',label:'下单人',width:'70'},
            ],
            pagesize:1,
            totals:0,
            screenWidth:'520px'
        }
    },
   
    created(){
        this.getproduceTaskpage()
    },
    methods: {
        getproduceTaskpage(){
            produceTaskpage(this.page).then(res=>{
                if(res.code==='0'){
                    res.data.records.map((item,index)=>{
                        item.index = index + 1
                        item.planStartTime = item.planStartTime.split(' ')[0]
                        item.planEndTime = item.planEndTime.split(' ')[0]
                        item.createTime = item.createTime.split(' ')[0]
                    })
                    this.tableData = res.data.records
                    this.pagesize = parseInt(res.data.current)
                    this.totals = parseInt(res.data.total)
                }
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
            if(num==='0'){
                this.getproduceTaskpage()
            }
        },
        handleEdit(h,m){
             this.tit = '编辑任务'
             this.$refs.promodal.getproduceTaskid(m)
             this.dialogFormVisible = true
           
        },
        handleDelete(h,m){
            produceTaskdelete(m).then(res=>{
                if(res.code==='0'){
                    this.$message.success(res.msg)
                    this.getproduceTaskpage()
                }
            })
        },
        // 锁定解锁
        handleUntie(h,m){
            var obj = {id:m,state:h}
            updateProduceTaskLockById(obj).then(res=>{
                if(res.code==='0'){
                    this.$message.success(res.msg)
                    this.getproduceTaskpage()
                }
            })
        }
    }
}
</script>

<style lang='less'>
    .production{
         .top{
                height: 45px;
                line-height: 45px;
                .mr10{
                    margin-left: 5px;
                    width: 10%;
                }
                .datetime{
                    margin-left: 30%;
                    width: 20%;
                }
            }

            .elinput{
                width: 20%;
                margin: 0 2% 0 5px;
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
