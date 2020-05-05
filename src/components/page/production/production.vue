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
               
                <el-table-column label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="success"
                                    plain
                                    icon="el-icon-edit"
                                    @click="handleEdit(scope.$index, scope.row)"
                                >修改</el-button>
                               
                                <el-button
                                    type="info"
                                    plain
                                    icon="el-icon-delete"
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
                    
                    layout="total, prev, pager, next"
                    :total="totals">
                </el-pagination>
            </div>
          </div>
          <Modal :dialogFormVisible='dialogFormVisible' @close='close'/>
  </div>
</template>

<script>
import { produceTaskpage } from 'api/index'
import Modal from './modal'
export default {
    name: 'production',
    components:{
        Modal
    },
    data() {
        return {
            dialogFormVisible:false,
            value:'',
            value1:'',
            page:{
                current:1,
                size:10
            },
            tableData:[],
            columnlist:[
                {prop:'',label:'序号'},
                {prop:'taskNumber',label:'工单号'},
                // {prop:'productName',label:'物料名称'},
                // {prop:'productCode',label:'物料编码'},
                // {prop:'specificationModel',label:'规格型号'},
                {prop:'planYield',label:'计划生产量'},
                {prop:'planStartTime',label:'计划开始时间'},
                {prop:'state',label:'状态'},
                {prop:'produceProgress',label:'进度',width:'100'},
                {prop:'produceDuration',label:'用时',width:'100'},
             
            ],
            pagesize:1,
            totals:0
        }
    },
    created(){
        this.getproduceTaskpage()
    },
    methods: {
        getproduceTaskpage(){
            produceTaskpage(this.page).then(res=>{
                debugger
                if(res.code==='0'){
                    this.tableData = res.data.records
                    this.pagesize = parseInt(res.data.current)
                    this.totals = parseInt(res.data.total)
                }
            })
        },
        add(){
            debugger
            this.dialogFormVisible = true
        },
        close(){
            this.dialogFormVisible = false
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
