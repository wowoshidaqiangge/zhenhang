<!--
 * @Descripttion: 
 * @version: 
 * @Author: renqiang_hu
 * @Date: 2021-06-17 14:32:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-28 18:05:01
 * @FilePath: \vue-manage-system\src\components\page\production\warehouseManage.vue
-->

<template>
  <div class="warehouseManage">
      <div class="top" >
              <el-form :model="seachinfo"  ref="seachinfo"  class="demo-ruleForm">
              <el-row type="flex" justify="end">
                    <div style="flex:1">
                        
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
                    align="center"
                   >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span v-if="scope.row.state=='1' " style="color:rgb(40,176,40);font-weight:600">{{ scope.row.taskWarehouseState }}</span>
                            <span v-if="scope.row.state=='2' " style="color:rgb(255,153,19);font-weight:600">{{ scope.row.taskWarehouseState }}</span>
                            <span v-if="scope.row.state=='3' " style="color:rgb(69,79,201);font-weight:600">{{ scope.row.taskWarehouseState }}</span>
                           
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="进度"
                   >
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span style="color:rgb(40,176,40)">{{ scope.row.produceProgress }}</span>
                        </div>
                    </template>
                </el-table-column>
            
                <el-table-column label="操作" width="210" >
                            <template slot-scope="scope">
                                <el-button
                                    type="success"
                                    plain
                                    @click="handleUntie(scope.row)"
                                >部件详情</el-button>
                               
                            </template>
                    </el-table-column>
            
            </el-table> 
            <div class="page">
                <el-pagination
                    :background='true'
                    :current-page.sync="page.current"
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next"
                    :total="totals">
                </el-pagination>
            </div>
          </div>
         <WareModel :dialogFormVisible='dialogFormVisible' :orderlist="orderlist" @close='close' :tit='tit' ref="war"/>
  </div>
</template>
<script>
import { produceWarehousePage,listEnum } from 'api/index'

import moment from 'moment'
import WareModel from './wareModel.vue'
import { mapState } from 'vuex'
export default {
    name: 'warehouseManage',
    components:{
        WareModel
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
            
            value:'',
            value1:'',
            tit:'部件详情',
            page:{
                current:1,
                size:10
            },
            tableData:[1],
            columnlist:[
                {prop:'index',label:'序号',width:'50'},
                {prop:'taskNumber',label:'任务单号'},
                {prop:'zhNumber',label:'臻航号'},
                {prop:'productCode',label:'货品编码'},
                {prop:'customerModel',label:'客户型号'},
                {prop:'orderCount',label:'订单量'},
                {prop:'planYield',label:'计划生产量',width:'95'},
            
                {prop:'planFinishTime',label:'交货时间',},

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
       this.getproduceWarehousePage()
       this.getproduceTaskStateList()
    },
    methods: {
        // 查询状态
         getproduceTaskStateList(){
           listEnum({type:'produce_warehouse_state'}).then(res=>{
                if(res.code==='0'){
                    this.orderlist = res.data
                }
            })
        },
        //重置
        resetting(){
         
            this.page={
                current:1,
                size:10
            }
            this.seachinfo = {}
            this.value1 = ''
            this.getproduceWarehousePage()
        },
        changedate(val){
            this.seachinfo.beginDate = moment(val[0]).format('YYYY-MM-DD')
            this.seachinfo.endDate = moment(val[1]).format('YYYY-MM-DD')
        },
        //搜索
        seachinfo1(){
            this.page.current = 1
           this.getproduceWarehousePage(this.seachinfo)
        },
        // 获取列表
        getproduceWarehousePage(){
            produceWarehousePage({...this.page,...this.seachinfo}).then(res=>{
              
                if(res.code=='0'){
                    res.data.records.map((item,index)=>{
                        item.index = index + 1
                    })
                    this.tableData = res.data.records
                    this.page.current = Number(res.data.current)
                    this.totals = Number(res.data.total)
                }
            })
        },
        handleCurrentChange(val){
            this.page.current=val
            this.getproduceWarehousePage()
        },
       async handleUntie(info){
            
            await this.$refs.war.getpro(info)
            this.dialogFormVisible = true
        },
        close(){
            this.dialogFormVisible = false
            this.getproduceWarehousePage()
        }
       
    }
}
</script>

<style lang='less'>
    .warehouseManage{
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
