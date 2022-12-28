<!--
 * @Descripttion: 
 * @version: 
 * @Author: renqiang_hu
 * @Date: 2021-06-17 15:02:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-24 18:55:26
 * @FilePath: \vue-manage-system\src\components\page\production\purchaseModel.vue
-->
<template>
  <div class="purchaseModel">
    <el-dialog :title="tit" width="75%" :visible.sync="dialogFormVisible" :before-close='beforclose' center>
        <div >
           
             <el-select v-model="stateval"  placeholder="请选择状态" >
                <el-option
                    v-for="item in orderlist"
                    :key="item.enumKey"
                    :label="item.enumValue"
                    :value="item.enumKey">
                </el-option>
            </el-select>
              <el-button type="add" style="margin-left:20px" @click="search">查 询</el-button>
        </div>
         <el-row style="margin:15px 0">
            <el-col :span='6'>
                <span>任务单号：</span><span>{{purid.taskNumber}}</span>
            </el-col>
            <el-col :span='6'>
                <span>臻航号：</span><span>{{purid.zhNumber}}</span>
            </el-col>
            <el-col :span='6'>
                <span>货品编码：</span><span>{{purid.productCode}}</span>
            </el-col>
            <el-col :span='6'>
                <span>交货时间：</span><span>{{purid.planFinishTime}}</span>
            </el-col>
         </el-row>
         <el-table
                :data="tableData"
                stripe
                border
                style="width: 100%">
                <el-table-column
                    v-for="(item,index) in columnList"
                    :key="index"
                    :width="item.width"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                >
                </el-table-column>
                 <el-table-column label="操作" width="200" >
                            <template slot-scope="scope">
                                <el-button type="add" v-if="scope.row.state==1 " @click="hlandpur(scope.row,'2')" plain>采购</el-button>
                               <el-button type="success" v-if="scope.row.state=='1' || scope.row.state==2" @click="hlandpur(scope.row,'3')" plain>已就绪</el-button>
                               <el-button type="info" v-if="scope.row.state==3 || scope.row.state==2" @click="hlandpur(scope.row,'1')" plain>取消操作</el-button>
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
        <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="marksure('form')">确 定</el-button> -->
        </div>
    </el-dialog>

  </div>
</template>

<script>

import moment from 'moment'
import { produceTaskbuyPartPage,produceTaskbuyPartPut } from 'api/index'
export default {
    name: 'purchaseModel',
    props:{
        dialogFormVisible:{
            type:Boolean
        },
        tit:{
            type:String
        },
        orderlist:{
            type:Array
        }
    },
    data() {
        return {
            page:{
                current:1,
                size:10
            },
            columnList:[
                {prop:'index',label:'序号'},
                {prop:'partCode',label:'部件编码'},
                {prop:'partNumber',label:'元件编号'},
                {prop:'partName',label:'元件名称'},
                {prop:'stWorkprocess',label:'发料工序'},
             
                {prop:'orderCount',label:'订单量'},
                {prop:'planYield',label:'计划生产量'},
                {prop:'partState',label:'状态'},
            ],
            tableData:[],
            purid:'',
            stateval:'',
          
            totals:0
        }
    },
    created(){
      
    
    },
    methods: {
        handleCurrentChange(val){
            this.page.current = val
            this.getproduceTaskbuyPartPage()
        },
        hlandpur(info,num){
            let obj = {
                id:info.id,
                state:num,
                produceTaskId:info.produceTaskId,
                partId:info.partId,
                produceTaskbuyId:info.produceTaskbuyId
            }
            produceTaskbuyPartPut(obj).then(res=>{
                if(res.code=='0'){
                    this.$message.success(res.msg)
                    
                    this.getproduceTaskbuyPartPage()
                }
            })
        },
        search(){
            this.page.current = 1
            this.getproduceTaskbuyPartPage()
        },
       async getproduceTaskbuyPartPage(){
          await produceTaskbuyPartPage({produceTaskbuyId:this.purid.id,...this.page,state:this.stateval}).then(res=>{
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
      async getpro(info){
           this.purid = info
          await this.getproduceTaskbuyPartPage()
       },
       close(num){
           this.init()
           this.$emit('close',num)
       },
     
       marksure(form){
          
       },
       beforclose(){
          this.init()
          this.$emit('close',false)
       },
       init(){
           
            this.tableData2 = []
            this.value2 = []
       }
    }
}
</script>


<style lang='less' scpoed>
        .purchaseModel{
            .el-col{
                    margin-bottom: 10px;
                }
        }
       
        .el-dialog{
            border-radius: 5px;
        }
        .el-dialog__header{
            background-color: #409BAF;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            text-align: center;
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
        
    

</style>
