<template>
  <div class="record">
       <div class="top">
            <el-row>
                <el-form :model="seachinfo"  ref="seachinfo"  class="demo-ruleForm">
                <el-col :span="15">
                    <el-form-item label="" >
                        <el-button type="add" icon='el-icon-circle-plus-outline' @click="add">新增</el-button>
                    </el-form-item>
                </el-col>
                
                <el-col :span="2" style="margin:0 20px">
                  <el-form-item label=""  prop="manageState" >
                      <el-select v-model="seachinfo.manageState"  placeholder="状态" >
                          <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3" style="margin-right:10px">
                    <el-form-item label=""  prop="name" >
                      <el-input  placeholder="设备名称" v-model="seachinfo.name" class="elinput"> </el-input>
                  </el-form-item>
                    
                </el-col>
                <el-col :span="3">
                    <el-form-item label="" >
                          <el-button type="add" icon="el-icon-search" @click="seachinfo1">搜索</el-button>
                          <el-button type="success" icon="el-icon-refresh-right" @click="resetting">重置</el-button>
                    </el-form-item>
                </el-col>
              </el-form>
            </el-row>
      </div>
        <div class="bot">
            <el-table
                :data="tableData"
                stripe
                :height="screenWidth"
                style="width: 100%">
                <el-table-column
                v-for="(item,index) in columnlist"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                align="center"
                >
                </el-table-column>
                 <el-table-column
                    label="状态"
                    width="50">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <span v-if="scope.row.manageState==1" style="font-weight:600">正常</span>
                            <span v-if="scope.row.manageState==2" style="font-weight:600;color:red">报废</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="210" >
                            <template slot-scope="scope">
                                <el-button
                                    type="success"
                                    plain
                                    v-if='scope.row.manageState===2'
                                    class="red"
                                    @click="handlesplit(1, scope.row)"
                                >启用</el-button>
                                <el-button
                                    type="add"
                                    plain
                                    v-if='scope.row.manageState===1'
                                    class="red"
                                    @click="handlesplit(2, scope.row)"
                                >报废</el-button>
                                 <el-button
                                    type="info"
                                     v-if='scope.row.manageState===1'
                                    plain
                                    @click="handleEdit(scope.$index, scope.row)"
                                >修改</el-button>
                                <el-button
                                    type="danger"
                                    plain
                                    v-if='scope.row.manageState===1'
                                    class="red"
                                    @click="handledistribute(scope.$index, scope.row)"
                                >删除</el-button>
                            </template>
                    </el-table-column>
            </el-table>    
        </div>
        <div class="page">
                <el-pagination
                    :background='true'
                    :current-page.sync="pagesize"
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next"
                    :total="totals">
                </el-pagination>
        </div>
        <recordModal :dialogFormVisible='dialogFormVisible' @close='close' :tit='tit' ref='recordmodal'/>
  </div>
</template>

<script>
import {devicepage,updateState,devicedelete} from 'api/main'
import recordModal from './recordmodal'
import { mapState } from 'vuex'
export default {
    name: 'record',
    components:{
      recordModal
    },
    data() {
        return {
            value1:'',
            seachinfo:{
                manageState:'',
                name:''
            },
            columnlist:[
                {prop:'index',label:'序号'},
                {prop:'name',label:'设备名称'},
                {prop:'model',label:'规格型号'},
                {prop:'number',label:'设备型号'},
                {prop:'toTypeName',label:'设备类型'},
                {prop:'typeName',label:'所属车间'},
                {prop:'manufacturers',label:'生产厂家'},
                {prop:'suppliers',label:'供应商'},
                {prop:'createTime',label:'新增时间'}
            ],
            tableData:[],
            page:{
                current:1,
                size:10
            },
            dialogFormVisible:false,
            tit:'',
            pagesize:1,
            totals:0,
            screenWidth:(document.body.clientHeight-215) + 'px',
            options:[
              {value:'2',label:'报废'},
              {value:'1',label:'正常'},
            ]
        }
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
  
    created(){
        this.getdevicepage()
    },
    methods: {
        //获取数据列表
        getdevicepage(){
            let obj ={...this.seachinfo,...this.page}
            devicepage(obj).then(res=>{
                if(res.code==='0'){
                    res.data.records.map((item,index)=>{
                        item.index = index+1
                        item.createTime = item.createTime.split(' ')[0]
                    })
                    this.pagesize = parseInt(res.data.current)
                    this.totals = parseInt(res.data.total)
                    this.tableData = res.data.records
                }
            })
        },
        add(){
            this.tit = '新增档案'
            this.dialogFormVisible = true
        },
        resetting(){
            this.seachinfo={manageState:'',name:''}
            this.page.current =1
            this.getdevicepage()
        },
        seachinfo1(){
            this.getdevicepage()
        },
        close(num){
            this.dialogFormVisible = false
            if(num==='0'){
                this.getdevicepage()
            }
        },
        handleCurrentChange(val){
            this.page.current = val
            this.getdevicepage()
        },
        //修改
        handleEdit(h,m){
            this.tit = '修改设备'
            this.$refs.recordmodal.getdeviceid(m)
            this.dialogFormVisible = true
        },
        //报废
        handlesplit(h,m){
            var obj={
                id:m.id,
                manageState:h
            }
            // obj = JSON.stringify(obj)
            updateState(obj).then(res=>{
                if(res.code==='0'){
                    this.$message.success(res.msg)
                    this.getdevicepage()
                }
            })
        },
        // 删除
        handledistribute(h,m){
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                   devicedelete(m).then(res=>{
                        if(res.code==='0'){
                            this.$message.success(res.msg)
                            this.getdevicepage()
                        }

                    })
            })
            .catch(() => {});
            
        }
       
    }
}
</script>


<style lang='less'>
   .record{
       width: 100%;
       height: 100%;
        .top{
            height: 50px;
            margin-top: 10px;
            
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
