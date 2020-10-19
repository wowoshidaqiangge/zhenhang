<template>
  <div class="promoadl">
    
    <el-dialog :title="tit" width="60%" :visible.sync="dialogFormVisibledit" :before-close='beforclose' center>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="任务详情" name="first">
                 <el-row>
                <el-form :model="form" ref='form'>
                    <el-col :span="11">
                            <el-form-item label="订单编号" :label-width="formLabelWidth" prop='taskNumber'>
                                <el-input v-model="form.taskNumber"  disabled autocomplete="off"></el-input>
                                    <!-- <el-select v-model="form.orderCode" disabled  placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.orderCode"
                                        :value="item.id">
                                        </el-option>
                                    </el-select> -->
                            </el-form-item>
                        </el-col>
                    <el-col :span="11">
                            <el-form-item label="臻航号" :label-width="formLabelWidth" prop='zhNumber'>
                                    <el-input v-model="form.zhNumber"  disabled autocomplete="off"></el-input>
                            </el-form-item>
                    </el-col>
                    
                    <el-col :span="24">
                             <el-col :span="11">
                                 <el-form-item label="货品编码" :label-width="formLabelWidth" prop='productCode'>
                                        <el-input v-model="form.productCode"  disabled autocomplete="off"></el-input>
                                        <!-- <el-select v-model="form.productId" disabled  placeholder="请选择">
                                            <el-option
                                                v-for="item in prolist"
                                                :key="item.id"
                                                :label="item.productCode"
                                                :value="item.id">
                                            </el-option>
                                        </el-select> -->
                                    </el-form-item>
                            </el-col>
                    </el-col>
                    <p>
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
                    </p>
                     <el-col :span="22" >
                           <el-form-item label="备注" :label-width="formLabelWidth" prop='remark'>
                                <el-input v-model="form.remark" type="textarea" disabled autocomplete="off"></el-input>
                            </el-form-item>
                    </el-col> 
                    <el-col :span="24" >
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
                              
                        </el-table> 
                    </el-col> 
                    </el-form> 
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="生产进度" name="second">
                  <el-row>
                <el-form :model="formpro" ref='form'>
                    <el-col :span="11">
                            <el-form-item label="订单编号" :label-width="formLabelWidth" prop='taskNumber'>
                                <el-input v-model="formpro.taskNumber"  disabled autocomplete="off"></el-input>
                                    <!-- <el-select v-model="formpro.taskNumber" disabled  placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.orderCode"
                                        :value="item.id">
                                        </el-option>
                                    </el-select> -->
                            </el-form-item>
                        </el-col>
                    <el-col :span="11">
                            <el-form-item label="臻航号" :label-width="formLabelWidth" prop='zhNumber'>
                                    <el-input v-model="formpro.zhNumber"  disabled autocomplete="off"></el-input>
                            </el-form-item>
                    </el-col>
                    
                    <el-col :span="24">
                             <el-col :span="11">
                                 <el-form-item label="货品编码" :label-width="formLabelWidth" prop='productCode'>
                                     <el-input v-model="formpro.productCode"  disabled autocomplete="off"></el-input>
                                    <!-- <el-select v-model="formpro.productId" disabled  placeholder="请选择">
                                        <el-option
                                            v-for="item in prolist"
                                            :key="item.id"
                                            :label="item.productCode"
                                            :value="item.id">
                                        </el-option>
                                    </el-select> -->
                                </el-form-item>
                             </el-col>
                    </el-col>
                    <p>
                            <el-col :span="11">
                                <el-form-item label="生产任务单" :label-width="formLabelWidth" prop='taskNumber'>
                                        <el-input v-model="formpro.taskNumber" disabled autocomplete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="客户型号" :label-width="formLabelWidth" prop='customerModel'>
                                        <el-input v-model="formpro.customerModel" disabled autocomplete="off"></el-input>
                                </el-form-item>
                            </el-col>
                    </p>
                    <el-col :span="22" >
                           <el-form-item label="备注" :label-width="formLabelWidth" prop='remark'>
                                <el-input v-model="form.remark" type="textarea" disabled autocomplete="off"></el-input>
                            </el-form-item>
                    </el-col> 
                    <el-col :span="24" >
                            <el-table
                                :data="tableData3"
                                style="width: 100%">
                                <el-table-column
                                        v-for="(item,index) in columnList1"
                                        :key='index'
                                        :prop="item.prop"
                                        :label="item.label"
                                        align="center"
                                >
                                </el-table-column>
                        </el-table> 
                    </el-col> 
                    </el-form> 
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="修改任务" name="third" v-if='!isnow'>
                <el-row>
                <el-form :model="form" ref='form'>
                    <el-col :span="11">
                            <el-form-item label="订单编号" :label-width="formLabelWidth" prop='taskNumber'>
                                <el-input v-model="form.taskNumber" disabled autocomplete="off"></el-input>
                                    <!-- <el-select v-model="form.orderCode" disabled  placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.orderCode"
                                        :value="item.id">
                                        </el-option>
                                    </el-select> -->
                            </el-form-item>
                        </el-col>
                    <el-col :span="11">
                            <el-form-item label="臻航号" :label-width="formLabelWidth" prop='zhNumber'>
                                    <el-input v-model="form.zhNumber" disabled autocomplete="off"></el-input>
                            </el-form-item>
                    </el-col>
                    
                    <el-col :span="11">
                            <el-form-item label="货品编码" :label-width="formLabelWidth" prop='productCode'>
                                <el-input v-model="form.productCode" disabled autocomplete="off"></el-input>
                                <!-- <el-select v-model="form.productId" disabled  placeholder="请选择">
                                    <el-option
                                        v-for="item in prolist"
                                        :key="item.id"
                                        :label="item.productCode"
                                        :value="item.id">
                                    </el-option>
                                </el-select> -->
                            </el-form-item>
                    </el-col>
                    <el-col :span="12">
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
                    <p>
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
                    </p>
                    <el-col :span="22" >
                           <el-form-item label="备注" :label-width="formLabelWidth" prop='remark'>
                                <el-input v-model="form.remark" type="textarea" disabled autocomplete="off"></el-input>
                            </el-form-item>
                    </el-col> 
                    <el-col :span="24" >
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
                                <el-table-column label="操作"  align="center" v-if="$_has('productionUpdate')">
                                    <template slot-scope="scope">
                                        <el-button
                                                type="info"
                                                v-if="scope.row.state==1 || scope.row.state==2"
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
            </el-tab-pane>
           
        </el-tabs>
       
         <el-dialog
            width="50%"
            title="部件修改"
            :visible.sync="innerVisible"
            append-to-body>
                <el-row>
                        <el-form :model="form1"  :rules="rules1" ref="form1">
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
        <div slot="footer" class="dialog-footer" v-if='!isnow'>
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="marksure('form')">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { produceTaskid,produceTaskput,getProduceProgress } from 'api/index'
import moment from 'moment'
import {orderlist,productlist,getItemListByProductId} from 'api/main'
export default {
    name: 'proeditmodal',
  
    props:{
        dialogFormVisibledit:{
            type:Boolean
        },
        tit:{
            type:String
        }
    },
    data() {
        return {
            value4:false,
            value3:false,
            value5:false,
            value6:false,
            value7:false,
            activeName:'first',
            form: {
                productName: '',
                orderId: '',
                taskNumber: '',
                productId: '',
                planYield:'',
                model: '',
                taskItemList:[]
            },
            form1:{
                partCode:'',
                itemName:'',
                model:'',
                material:'',
                yieid:'',
                planYield:'',
                planBuyYield:'',
                planStartTime:'',
                planEndTime:''
            },
            formpro:{

            },
            tableData3:[],
            innerVisible:false,
            value2:[],
            formLabelWidth: '100px',
            options:[],
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
            columnList1:[
                {prop:'partCode',label:'部件编码'},
                {prop:'partNumber',label:'元件编号'},
                {prop:'partName',label:'元件名称'},
                {prop:'stWorkprocess',label:'发料工序'},
                {prop:'source',label:'来源'},
                {prop:'orderCount',label:'订单量'},
                {prop:'planYield',label:'计划生产量'},
                {prop:'produceCount',label:'实际生产量'},
                {prop:"produceProgress",label:'进度'},
                {prop:'createTime',label:'报工时间'},
            ],
            prolist:[],
            yieid:'',
            produceTaskId:'',
            isnow:false,
            rules1:{
                 planYield:[
                     { required: true, message: '请输入', trigger: 'blur' },
                     {
                        validator(rule, value, callback) {
                        var reg = /^[0-9][0-9]*$/
                        if (reg.test(value)) {
                            callback()
                        } else {
                            callback(new Error('数量必须为整数'))
                        }
                        },
                        trigger: 'change'
                    }
                ],
                 planBuyYield:[
                     { required: true, message: '请输入', trigger: 'blur' },
                     {
                        validator(rule, value, callback) {
                        var reg = /^[0-9][0-9]*$/
                        if (reg.test(value)) {
                            callback()
                        } else {
                            callback(new Error('数量必须为整数'))
                        }
                        },
                        trigger: 'change'
                    }
                ],
            },
            bz:'',
            fb:'',
            ps:'',
            cy:'',
            zx:'',
        }
    },
    created(){
    //    this.getorderlist()
    //    this.getproductlist()
    },
    methods: {
        changeswitch(val){
             if(val&&this.tableData2.length>0){
                let a = this.tableData2.filter(v=>v.partCode==="包装")
                if(a.length<1){
                    if(this.bz){
                        this.tableData2.push(this.bz)
                    }else{
                        this.tableData2.push({partCode:'包装',itemCode:'300',planYield:0,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                    }
                    
                }
            }else if(!val&&this.tableData2.length>0){
                this.tableData2.map((item,index)=>{
                    if(item.partCode==='包装'){
                        this.tableData2.splice(index, 1)
                    }
                })
            }
        },
        changeswitch3(val){
            if(val&&this.tableData2.length>0){
                let a = this.tableData2.filter(v=>v.partCode==="冲压")
                if(a.length<1){
                    if(this.cy){
                        this.tableData2.push(this.cy)
                    }else{
                        this.tableData2.push({partCode:'冲压',itemCode:'400',planYield:0,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                    }
                    
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
                    if(this.zx){
                        this.tableData2.push(this.zx)
                    }else{
                        this.tableData2.push({partCode:'纸芯',itemCode:'500',planYield:0,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                    }
                    
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
                    if(this.fb){
                        this.tableData2.push(this.fb)
                    }else{
                        this.tableData2.push({partCode:'封边',itemCode:'100',planYield:0,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                    }
                    
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
                    if(this.ps){
                        this.tableData2.push(this.ps)
                    }else{
                        this.tableData2.push({partCode:'喷塑',itemCode:'200',planYield:0,orderCount:this.yieid,planBuyYield:0,planStartTime:'',planEndTime:''})
                    }
                    
                }
            }else if(!val&&this.tableData2.length>0){
                this.tableData2.map((item,index)=>{
                    if(item.partCode==='喷塑'){
                        this.tableData2.splice(index, 1)
                    }
                })
            }
        },
        // 生产进度进度
        getProduceProgress(id){
            getProduceProgress(id).then(res=>{
                res.data.planList.map((item)=>{
                       item.orderCount = id.orderCount
                       item.createTime = item.createTime.split(' ')[0]
                   })
                   this.tableData3 = res.data.planList
                   this.formpro = res.data
            })
        },
        handleClick(){

        },
        //修改物料
        handleEdit(h,m){
           
            this.value2 = [m.planStartTime,m.planEndTime]
            this.form1 = JSON.parse(JSON.stringify(m))
            this.innerVisible = true
        },
        close1(){
            this.innerVisible = false
        },
        marksure1(){
            this.$refs.form1.validate((valid) => {
                 if (valid) {
                     this.tableData2.map((item,index)=>{
                      
                        if(item.itemCode ===this.form1.itemCode){
                                // this.tableData2[index].planYield = this.form1.planYield
                                // this.tableData2[index].planBuyYield = this.form1.planBuyYield
                                // this.tableData2[index].planEndTime = this.form1.planEndTime
                                // this.tableData2[index].planStartTime = this.form1.planStartTime
                                this.$set(this.tableData2,index,this.form1)
                            }
                        })
                        // this.$forceUpdate()
                        this.innerVisible = false
                 }
            })
            
        },
       
        //查询物料列表
        // getItemListByProductId(id){
        //     getItemListByProductId(id).then(res=>{
        //         if(res.code==='0'){
        //             res.data.map((item,index)=>{
        //                 if(!item.planYield){
        //                     item.planYield = this.yieid
        //                 }
        //                 if(!item.planBuyYield){
        //                     item.planBuyYield = 0
        //                 }
        //                 if(!item.planStartTime){
        //                     item.planStartTime = ''
        //                     item.planEndTime = ''
        //                 }
        //                 item.yieid = this.yieid
        //             })
        //             this.tableData2 = res.data
        //         }
        //     })
        // },
        // // 修改产品编码
        // changeselect(val){
        //     let obj = {};
        //     obj = this.prolist.find((item)=>{  
        //             return item.id === val;  
        //         });
        //     this.form.productName = obj.productName 
        //     this.form.model = obj.model 
            
        //     this.getItemListByProductId({productId:val,produceTaskId:this.produceTaskId})
        // },
        // 产品编号列表
        getproductlist(){
            productlist().then(res=>{
                if(res.code==='0'){
                    // this.prolist = res.data
                }
            })
        },
        // 自动生成任务单号
        // changesel(val){
        //     let obj = {};
        //     obj = this.options.find((item)=>{  
        //             return item.id === val;  
        //         });
        //     this.form.taskNumber = 'RW_' + obj.orderCode 
        //     this.yieid = obj.planYield
        //     this.form.planYield = obj.planYield
        //      // 切换订单重置产品编码
        //     this.form.productId = ''
        //     this.tableData2 = []
        // },
       // 获取订单编号列表
       getorderlist(){
           orderlist().then(res=>{
               if(res.code==='0'){
                   this.options = res.data
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
           //判断是不是生产zhong
           if(id.state=='3'){
               this.isnow = true
           }else{
               this.isnow = false
           }
           produceTaskid(id).then(res=>{
             
               if(res.code==='0'){
                   res.data.planList.map((item)=>{
                       item.orderCount = id.orderCount
                       item.createTime = item.createTime.split(' ')[0]
                       if(item.partCode==='包装'){
                           this.value3 = true
                           item.itemCode= '300'
                           this.bz = item
                       }
                       if(item.partCode==='封边'){
                           this.value4 = true
                           item.itemCode= '100'
                           this.fb = item
                       }
                       if(item.partCode==='喷塑'){
                           this.value5 = true
                           item.itemCode= '200'
                           this.ps = item
                       }
                       if(item.partCode==='冲压'){
                           this.value6 = true
                           item.itemCode= '400'
                           this.cy = item
                       }
                       if(item.partCode==='纸芯'){
                           this.value7 = true
                           item.itemCode= '500'
                           this.zx = item
                       }
                   })
                
                   this.yieid = id.orderYield
                   this.produceTaskId = id.id
                   this.tableData2 = res.data.planList
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
                        produceTaskput(this.form).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg)
                                this.close('0')
                            }else{
                                this.$message.error(res.msg)
                            }
                        })
                }
          })
       },
       beforclose(){
           this.init()
          this.$emit('close',false)
       },
       init(){
           this.form= {
                productName: '',
                productCode: '',
                specificationModel: '',
                planYield: '',
                delivery: false,
                planStartTime: '',
                planEndTime: '',
                
            }
            this.value3 = false
            this.value4 = false
            this.value5 = false
             this.fb = ''
            this.bz = ''
            this.ps = ''
            this.produceTaskId = ''
            this.value2 = []
            this.activeName = 'first'
       }
    }
}
</script>


<style lang='less' scpoed>
    .promoadl{
       
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
