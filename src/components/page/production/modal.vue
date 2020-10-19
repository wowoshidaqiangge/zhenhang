<template>
  <div class="promoadl">
    
    <el-dialog :title="tit" width="70%" :visible.sync="dialogFormVisible" :before-close='beforclose' center>
        <el-row>
           <el-form :model="form" ref='form' :rules="rules">
                <el-col :span="11">
                    <el-form-item label="订单编号" :label-width="formLabelWidth" prop='orderNumber'>
                            <el-select v-model="form.orderNumber" @change='changesel' placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.orderNumber"
                                :value="item.orderNumber">
                                </el-option>
                            </el-select>
                    </el-form-item>
                </el-col>
               <el-col :span="11">
                    <el-form-item label="臻航号" :label-width="formLabelWidth" prop='zhNumber'>
                            <el-select v-model="form.zhNumber" @change='changeselzh' placeholder="请选择">
                                <el-option
                                v-for="item in optionszh"
                                :key="item.id"
                                :label="item.zhNumber"
                                :value="item.zhNumber">
                                </el-option>
                            </el-select>
                    </el-form-item>
                </el-col>
               <el-col :span="24">
                    <el-col :span="11">
                        <el-form-item label="货品编码" :label-width="formLabelWidth" prop='productCode'>
                            <el-select v-model="form.productCode" filterable  @change='changeselect' placeholder="请选择">
                                <el-option
                                    v-for="item in optionshp"
                                    :key="item.id"
                                    :label="item.productCode"
                                    :value="item.productCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        
                    </el-col>
                    <el-col :span="11">
                        <el-col :span="8">
                            <el-form-item label="冲压工单" :label-width="formLabelWidth" >
                                <el-switch
                                    v-model="value6"  @change="changeswitch3">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="纸芯工单" :label-width="formLabelWidth" >
                                <el-switch
                                    v-model="value7"  @change="changeswitch4">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="封边工单" :label-width="formLabelWidth" >
                                <el-switch
                                    v-model="value4"  @change="changeswitch1">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="喷塑工单" :label-width="formLabelWidth" >
                                <el-switch
                                    v-model="value5"  @change="changeswitch2">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="包装工单" :label-width="formLabelWidth" >
                                <el-switch
                                    v-model="value3"  @change="changeswitch">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    
               </el-col>
              
                <el-col :span="11">
                    <el-form-item label="生产任务单" :label-width="formLabelWidth" prop='taskNumber'>
                            <el-input v-model="form.taskNumber" disabled autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="客户型号" :label-width="formLabelWidth" prop='customerModel'>
                            <el-input v-model="form.customerModel" disabled autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                        <el-form-item label="备注" :label-width="formLabelWidth" prop='remark'>
                                <el-input v-model="form.remark" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                <el-col :span="24" v-if="tableData2.length>0">
                       <el-table
                            :data="tableData2"
                            style="width: 100%">
                            <el-table-column
                                v-for="(item,index) in columnList"
                                :key='index'
                                :prop="item.prop"
                                :label="item.label"
                                align="center"
                            >
                            </el-table-column>
                          <el-table-column label="操作"  align="center">
                            <template slot-scope="scope">
                                 <el-button
                                    type="info"
                                    plain
                                    icon="el-icon-edit"
                                    @click="handleEdit(scope.$index, scope.row)"
                                ></el-button>
                               
                            </template>
                    </el-table-column>
                        </el-table> 
                </el-col> 
                 
            </el-form> 
        </el-row>
         <el-dialog
            width="50%"
            title="部件修改"
            :visible.sync="innerVisible"
            append-to-body>
                <el-row>
                        <el-form :model="form1" :rules="rules1"  ref="form1">
                            <el-col :span="11">
                                <el-form-item label="元件编码" :label-width="formLabelWidth" class="formitem formitem1" prop="partNumber">
                                        <el-input v-model="form1.partNumber" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="部件编码" :label-width="formLabelWidth" class="formitem formitem1" prop="partCode">
                                        <el-input v-model="form1.partCode" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="元件名称" :label-width="formLabelWidth" class="formitem formitem1" prop="partName">
                                        <el-input v-model="form1.partName" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="发料工序" :label-width="formLabelWidth" class="formitem formitem1" prop="stWorkprocess">
                                        <el-input v-model="form1.stWorkprocess" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                    <el-col :span="11">
                                        <el-form-item label="来源" :label-width="formLabelWidth" class="formitem formitem1" prop="source">
                                                <el-input v-model="form1.source" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="订单量" :label-width="formLabelWidth" class="formitem formitem1" prop="orderCount">
                                                <el-input v-model="form1.orderCount" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="计划生产量" :label-width="formLabelWidth" class="formitem formitem1" prop="planYield">
                                        <el-input v-model="form1.planYield" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="计划采购量" :label-width="formLabelWidth" class="formitem formitem1" prop="planBuyYield">
                                        <el-input v-model="form1.planBuyYield" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="计划时间" :label-width="formLabelWidth" >
                                    <el-date-picker
                                        style='width:100%'
                                        @change='changetime'
                                        v-model="value2"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"> 
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            
                        </el-form>
                    </el-row>
                <div slot="footer" class="dialog-footer">
                        <el-button @click="close1">取 消</el-button>
                        <el-button type="primary" @click="marksure1">确 定</el-button>
                </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="marksure('form')">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { produceTask,produceTaskid } from 'api/index'
import moment from 'moment'
import {orderlist,productlist,getItemListByProductId,getZhNumberListByOrderNumber,getProductCodeListByZhNumber,getPartListByPorductCode} from 'api/main'
export default {
    name: 'promoadl',
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
            value3:true,
            value4:true,
            value5:true,
            value6:true,
            value7:true,
            form: {
                taskNumber: '',
                orderNumber: '',
                zhNumber: '',
                productCode: '',
                planYield:'',
                customerModel: '',
                
                taskItemList:[]
            },
            form1:{
                partCode:'',
                itemName:'',
                customerModel:'',
                material:'',
                yieid:'',
                planYield:'',
                planBuyYield:'',
                planStartTime:'',
                planEndTime:''
            },
            innerVisible:false,
            value2:[],
            formLabelWidth: '100px',
            options:[],
            optionszh:[],
            optionshp:[],
            tableData2:[],
            columnList:[
                {prop:'partCode',label:'部件编码'},
                {prop:'partNumber',label:'元件编码'},
                {prop:'partName',label:'元件名称'},
                {prop:'stWorkprocess',label:'发料工序'},
                {prop:'source',label:'来源'},
                {prop:'orderCount',label:'订单量'},
                {prop:'planYield',label:'计划生产量'},
                {prop:'planBuyYield',label:'计划采购量'},
                {prop:'planStartTime',label:'开始时间'},
                {prop:'planEndTime',label:'结束时间'},
            ],
            prolist:[],
            yieid:'',
             rules: {
                orderNumber: [
                    { required: true, message: '请选择', trigger: 'blur' },
                   
                ],
                productCode:[
                    { required: true, message: '请选择', trigger: 'blur' },
                ]
            },
            rules1:{
               planYield:[
                   { required: true, message: '请输入', trigger: 'blur' },
                   {
                        validator(rule, value, callback) {
                        var reg = /^[0-9][0-9]*$/
                        if (reg.test(value)) {
                            callback()
                        } else {
                            callback(new Error('产量必须为整数'))
                        }
                        },
                        trigger: 'change'
                    }
               ]
            }
         
        }
    },
    created(){
        this.getorderlist()
        // this.getproductlist()
    },
    methods: {
        changeswitch3(val){
            if(val&&this.tableData2.length>0){
                let a = this.tableData2.filter(v=>v.partCode==="冲压")
                if(a.length<1){
                    this.tableData2.push({partCode:'冲压',itemCode:'400',planYield:this.yieid,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                }
            }else if(!val&&this.tableData2.length>0){
                this.tableData2.map((item,index)=>{
                    if(item.partCode==='冲压'){
                        this.tableData2.splice(index, 1)
                    }
                })
            }
        },
        changeswitch4(val){
            if(val&&this.tableData2.length>0){
                let a = this.tableData2.filter(v=>v.partCode==="纸芯")
                if(a.length<1){
                    this.tableData2.push({partCode:'纸芯',itemCode:'500',planYield:this.yieid,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                }
            }else if(!val&&this.tableData2.length>0){
                this.tableData2.map((item,index)=>{
                    if(item.partCode==='纸芯'){
                        this.tableData2.splice(index, 1)
                    }
                })
            }
        },
        changeswitch1(val){
            if(val&&this.tableData2.length>0){
                let a = this.tableData2.filter(v=>v.partCode==="封边")
                if(a.length<1){
                    this.tableData2.push({partCode:'封边',itemCode:'100',planYield:this.yieid,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                }
            }else if(!val&&this.tableData2.length>0){
                this.tableData2.map((item,index)=>{
                    if(item.partCode==='封边'){
                        this.tableData2.splice(index, 1)
                    }
                })
            }
        },
        changeswitch2(val){
             if(val&&this.tableData2.length>0){
                let a = this.tableData2.filter(v=>v.partCode==="喷塑")
                if(a.length<1){
                    this.tableData2.push({partCode:'喷塑',itemCode:'200',planYield:this.yieid,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                }
            }else if(!val&&this.tableData2.length>0){
                this.tableData2.map((item,index)=>{
                    if(item.partCode==='喷塑'){
                        this.tableData2.splice(index, 1)
                    }
                })
            }
        },
        changeswitch(val){
            if(val&&this.tableData2.length>0){
                let a = this.tableData2.filter(v=>v.partCode==="包装")
                if(a.length<1){
                    this.tableData2.push({partCode:'包装',itemCode:'300',planYield:this.yieid,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                }
            }else if(!val&&this.tableData2.length>0){
                this.tableData2.map((item,index)=>{
                    if(item.partCode==='包装'){
                        this.tableData2.splice(index, 1)
                    }
                })
            }
        },
        //修改物料
        handleEdit(h,m){
            this.form1 = JSON.parse(JSON.stringify(m))
            this.innerVisible = true
        },
        close1(){
            this.value2 = []
            this.form1.planEndTime = ''
            this.form1.planStartTime = ''
            this.innerVisible = false
        },
        marksure1(){
            // if(this.value2.length<1){
            //     this.$message.error('请选择时间')
            //     return
            // }
            this.$refs.form1.validate((valid) => {
                if (valid) {
                    this.tableData2.map((item,index)=>{
                        if(item.itemCode ===this.form1.itemCode){
                            this.tableData2[index].planYield = this.form1.planYield
                            this.tableData2[index].planBuyYield = this.form1.planBuyYield
                            this.tableData2[index].planEndTime = this.form1.planEndTime
                            this.tableData2[index].planStartTime = this.form1.planStartTime
                            this.value2 = []
                            this.form1.planEndTime = ''
                            this.form1.planStartTime = ''
                        }
                    })
                    this.$forceUpdate()
                    this.innerVisible = false
                }
            })
            
        },
        getPartListByPorductCode(val){
             let obj = {productCode:val}
            getPartListByPorductCode(obj).then(res=>{
                if(res.code==='0'){
                    res.data.map((item,index)=>{
                        item.planYield = this.yieid
                        item.orderCount = this.yieid
                        item.planBuyYield = 0
                        item.planStartTime = ''
                        item.planEndTime = ''
                        item.itemCode = item.id
                    })
                    if(this.value6){
                        res.data.push({partCode:'冲压',itemCode:'400',planYield:this.yieid,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                    }
                     if(this.value7){
                        res.data.push({partCode:'纸芯',itemCode:'500',planYield:this.yieid,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                    }
                    if(this.value4){
                        res.data.push({partCode:'封边',itemCode:'100',planYield:this.yieid,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                    }
                    if(this.value5){
                        res.data.push({partCode:'喷塑',itemCode:'200',planYield:this.yieid,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                    }
                    if(this.value3){
                        res.data.push({partCode:'包装',itemCode:'300',planYield:this.yieid,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                    }
                    this.tableData2 = res.data
                }
            })
        },
        //查询物料列表
        // getItemListByProductId(id){
        //     getItemListByProductId(id).then(res=>{
        //         if(res.code==='0'){
        //             res.data.map((item,index)=>{
        //                 item.planYield = this.yieid
        //                 item.yieid = this.yieid
        //                 item.planBuyYield = 0
        //                 item.planStartTime = ''
        //                 item.planEndTime = ''
        //             })
        //             if(this.value6){
        //                 res.data.push({itemCode:'冲压',id:'400',planYield:this.yieid,yieid:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
        //             }
        //              if(this.value7){
        //                 res.data.push({itemCode:'纸芯',id:'500',planYield:this.yieid,yieid:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
        //             }
        //             if(this.value4){
        //                 res.data.push({itemCode:'封边',id:'100',planYield:this.yieid,yieid:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
        //             }
        //             if(this.value5){
        //                 res.data.push({itemCode:'喷塑',id:'200',planYield:this.yieid,yieid:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
        //             }
        //             if(this.value3){
        //                 res.data.push({itemCode:'包装',id:'300',planYield:this.yieid,yieid:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
        //             }
        //             this.tableData2 = res.data
        //         }
        //     })
        // },
        // 修改产品编码
        changeselect(val){
            let obj = {};
            obj = this.optionshp.find((item)=>{  
                    return item.productCode === val;  
                });
           
            this.tableData2 = []
            this.getPartListByPorductCode(val)
            // this.getItemListByProductId({productId:val})
        },
        // 产品编号列表
        getproductlist(){
            productlist().then(res=>{
                if(res.code==='0'){
                    // this.prolist = res.data
                }
            })
        },
        // 自动生成任务单号
        changesel(val){
          
            let obj = {};
            obj = this.options.find((item)=>{  
                    return item.orderNumber === val;  
                });
           
            this.form.orderId = obj.id
            // this.yieid = obj.planYield
            this.form.planYield = obj.planYield
            this.getZhNumberListByOrderNumber(val)
            // 切换订单重置产品编码
            this.form.productCode = ''
            this.tableData2 = []
             this.form.customerModel = ''
                 this.form.taskNumber = ''
         
                this.tableData2 = []
                this.optionshp = []
                this.optionszh = []
                this.form.zhNumber = ''
               
                 this.form.taskNumber = val 
        },
        changeselzh(val){
          
          let obj = {};
            obj = this.optionszh.find((item)=>{  
                    return item.zhNumber === val;  
                });
                this.form.customerModel =obj.customerModel
                
                this.yieid = obj.orderCount
                this.tableData2 = []
                this.optionshp = []
                this.form.productCode = ''
            this.getProductCodeListByZhNumber(val)
        },
       // 获取订单编号列表
       getorderlist(){
           orderlist().then(res=>{
               if(res.code==='0'){
                 
                   this.options = res.data
               }
           })
       },
       // 获取臻航号列表
       getZhNumberListByOrderNumber(val){
           let obj = {orderNumber:val}
           getZhNumberListByOrderNumber(obj).then(res=>{
               if(res.code==='0'){
                   
                   this.optionszh = res.data
               }
           })
       },
       // 获取货品编号
       getProductCodeListByZhNumber(val){
           let obj = {zhNumber:val}
           getProductCodeListByZhNumber(obj).then(res=>{
               if(res.code==='0'){
                
                   this.optionshp = res.data
               }
           })
       },
       changetime(h){
           this.form1.planStartTime = moment(h[0]).format('YYYY-MM-DD')
           this.form1.planEndTime = moment(h[1]).format('YYYY-MM-DD')
       },
       close(num){
           this.init()
           this.$emit('close',num)
       },
       getproduceTaskid(id){
           produceTaskid(id).then(res=>{
               if(res.code==='0'){
                   this.value1 = [res.data.planStartTime,res.data.planEndTime]
                   this.form = res.data
               }
           })
       },
       marksure(form){
            let arr =[]
            this.tableData2.map(item=>{
               
                arr.push({itemCode:item.itemCode,
                productCode:item.productCode,
                planYield:item.planYield,
                partNumber:item.partNumber,
                partName:item.partName,
                stWorkprocess:item.stWorkprocess,
                source:item.source,
                orderCount:item.orderCount,
                partCode:item.partCode,
                planBuyYield:item.planBuyYield,
                planStartTime:item.planStartTime,
                planEndTime:item.planEndTime})
            })
            this.form.taskItemList = arr
            this.$refs[form].validate((valid) => {
                if (valid) {
                        produceTask(this.form).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.getorderlist()
                                this.close('0')
                            }else{
                                this.$message.error(res.msg)
                            }
                        })
                }else{

                }
          })
       },
       beforclose(){
          this.init()
          this.$emit('close',false)
       },
       init(){
           this.form= {
                taskNumber: '',
                orderNumber: '',
                zhNumber: '',
                productCode: '',
                planYield:'',
                customerModel: '',
                taskItemList:[]
                
            }
            this.tableData2 = []
            this.value2 = []
       }
    }
}
</script>


<style lang='less' scpoed>
        .promoadl{
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
