<template>
  <div class="record">
       <div class="top">
               <el-button type="add" icon='el-icon-circle-plus-outline' @click="add">新增</el-button>
                <el-select v-model="value1"  placeholder="地址" class="handle-select mr10">
                    
                </el-select>
                <el-input  placeholder="用户名" class="elinput" v-model="value1" @keyup.enter.native="search()"></el-input>
                <el-button type="add" icon="el-icon-search" @click="search">搜索</el-button>
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
            screenWidth:'520px'
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
            devicepage(this.page).then(res=>{
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
        search(){

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
                height: 45px;
                line-height: 45px;
            .mr10{
                margin-left: 50%;
                width: 10%;
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
