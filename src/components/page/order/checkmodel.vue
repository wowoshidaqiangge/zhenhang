<template>
  <div class="ordermodal">
    
    <el-dialog :title="tit"  width="70%" :visible.sync="dialogFormVisible" :before-close='beforclose' center>
        <el-row>
           <el-form :model="form" :rules="rules" ref='form'>
                     <el-col :span="24">
                         <el-table :data="tableData1" border :span-method="objectSpanMethod" style="width: 100%">
                            <el-table-column
                                v-for="item in columnList"
                                :key="item.id"
                                :prop="item.prop"
                                :label="item.label"
                                align="center"
                            >
                            </el-table-column>
                            <!-- <el-table-column
                                label="工艺文件"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="info"
                                        plain
                                        @click="handleEdit1(scope.row)"
                                        >查看</el-button
                                    >
                              
                                </template>
                            </el-table-column> -->
                        </el-table>
                     </el-col>
                     <el-col :span="24" style="margin-top:25px">
                        <el-form-item label="驳回原因" :label-width="formLabelWidth" prop='refuteCause'>
                                <el-input v-model="form.refuteCause" type="textarea" :rows="2"></el-input>
                        </el-form-item>
                    </el-col>
            </el-form> 
        </el-row>
       
        <div slot="footer" class="dialog-footer">
            <el-button @click="marksure('no')">不通过</el-button>
            <el-button type="primary" @click="marksure('yes')">通 过</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { produceTask,produceTaskid,produceTaskput } from 'api/index'
import { producetaskorderExcel,checkOrderByIds} from 'api/main'

import { onenet } from 'api/onenet';
import {orderadd,orderid,orderput} from 'api/main'
import moment from 'moment'
export default {
    name: 'checkmodal',
  
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
            formLabelWidth: '80px',
              rules: {
              
            },
            innerVisible:false,
            form1:{

            },
            tableData1:[],
            columnList:[
                {prop:'index',label:'序号'},
                {prop:'orderNumber',label:'订单号'},
                {prop:'zhNumber',label:'臻航号'},
                {prop:'customerModel',label:'客户型号'},
                {prop:'customerRequireModel',label:'客户要求型号'},
                {prop:'manufacturer',label:'制造商'},
                {prop:'orderCount',label:'订单量'},
                {prop:'produceCount',label:'实际生产量'},

                {prop:'sparyPowder',label:'喷涂塑粉'},
                {prop:'encasementCount',label:'装箱数'},
                {prop:'filterMaterial',label:'滤材'},
                {prop:'planFinishTime',label:'交货日期'},
                {prop:'createTime',label:'下单日期'},
                {prop:'createUserName',label:'下单人'},
            
            ]
        }
    },
    created(){
       
    },
    methods: {
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
                if ( columnIndex ===14) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                   
                    return { // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                        rowspan: _row,
                        colspan: _col
                    }
                }
        },
       getall(val){
        
           let pro = JSON.parse(JSON.stringify(val))
           pro.map((item,index)=>{
               item.index = index +1
           })
           this.getSpanArr(pro)
           this.tableData1 = pro
       },
      
       close(num){
           this.init()
           this.$emit('close',num)
       },
       
       marksure(val){
           let arr = []
           this.tableData1.map((item)=>{
               if(val==='no'){
                   arr.push({id:item.id,state:8,updateUser:sessionStorage.getItem('userId'),refuteCause:this.form.refuteCause})
               }else{
                   arr.push({id:item.id,state:7,updateUser:sessionStorage.getItem('userId')	})
               }
               
           })
           let warn = val==='no'?'确定不通过吗？':'确定通过吗？'
           this.$confirm(warn, '提示', {
                type: 'warning'
            })
            .then(() => {
                     checkOrderByIds(arr).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.init()
                                this.close('0')
                            }
                        })
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
         this.tableData1 = [] 
         this.form = {}
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
        width: 104px;
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
