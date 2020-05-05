<template>
  <div class="staff">
      <div class="left" v-loading='leftloading'  element-loading-spinner="el-icon-loading" element-loading-text="加载中...">
        <div class="tit">
            <i class=" el-icon-menu"></i>
            组织机构
        </div>
        <el-tree 
            :data="data"
            style="margin:3px"
            :default-expand-all='true'
            :render-content="renderContent"
            @node-click="handleNodeClick">

        </el-tree>
      </div>
      <div class="right" >
          <div class="top">
              <el-button type="add" icon='el-icon-circle-plus-outline' @click="add">新增</el-button>
               <el-select v-model="value"  placeholder="地址" class="handle-select mr10">
                    
                </el-select>
                <el-input  placeholder="用户名" class="elinput"></el-input>
                <el-button type="add" icon="el-icon-search">搜索</el-button>
          </div>
          <div class="bot" v-loading='botloading'  element-loading-spinner="el-icon-loading" element-loading-text="加载中...">
             <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                v-for="(item,index) in columnlist"
                :key="index"
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
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next"
                    :total="totals">
                </el-pagination>
            </div>
          </div>
      </div>
      <Modal :dialogFormVisible='dialogFormVisible' @close='close' ref='staffmodal' :isedit='isedit' :tit ='tit'/>
  </div>
</template>

<script>
import {deptList, userPage ,userDelete,authputUserid} from 'api/index'
import Modal from './staffmodal'
export default {
    name: 'staff',
    components:{
        Modal
    },
    data() {
        return {
            tit:'',
            dialogFormVisible:false,
            leftloading:false,
            botloading:false,
            visible:false,
            data:[],
            value:'',
            tableData:[],
            columnlist:[
                { prop:'id',label:'序号'},
                { prop:'name',label:'员工姓名'},
                { prop:'phone',label:'手机号'},
                { prop:'deptName',label:'部门'},
                { prop:'icCard',label:'IC卡'},
              
                { prop:'createTime',label:'创建时间'},
            ],
            page:{
                current	:1,
                size:10,
            },
            totals:0,
            pagesize:1,
            isedit:false
        }
    },
    created(){
        this.getdeptList()
        this.getuserPage()
    },
    methods: {
        
        handleCurrentChange(val) {
            this.page.current = val
            this.getuserPage()
            console.log(`当前页: ${val}`);
        },
        add(){
            this.tit = '新增用户'
            this.dialogFormVisible = true
        },
        close(h){
            this.dialogFormVisible = false
            if(h==='0'){
                this.getuserPage()
                
            }
        },
        handleEdit(h,m){
            this.tit = '编辑用户'
            this.isedit =  true
            this.$refs.staffmodal.getauthputUserid({id:m.id})
            this.dialogFormVisible = true
        },
        // 添加树状图icon
        renderContent (h, { node, data, store }) {
            return (
            <span>
              <i class={data.obj.icon}></i>
              <span> {node.label}</span>
            </span>
            )
        },
        // 删除
        handleDelete(h, m){
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                userDelete(m).then(res=>{
                    this.init()
                    this.getuserPage()
                    this.$message.success('删除成功');
                })
            }).catch(() => {});
           
        },
        init(){
            this.page ={current:1,size:10}
        },
        handleNodeClick(){

        },
        getuserPage(){
            this.botloading = true
            userPage(this.page).then(res=>{
                this.botloading = false
                if(res.code==='0'){
                    this.tableData =res.data.records
                    this.pagesize =parseInt(res.data.current) 
                    this.totals = parseInt(res.data.total)
                }
            })
        },
        getdeptList(){
            this.leftloading = true
           deptList().then(res=>{
               this.leftloading = false
                if(res.code==='0'){
                    this.data= res.data
                    // this.data = this.getarr(res.data)
                    // console.log(this.getarr(res.data))
                }
           })
        }
    }
}
</script>


<style lang='less'>
    .staff{
        width:100% ;
        height: 100%;
        display: flex;
        .left{
            width: 180px;
            box-shadow:0px 1px 4px 2px rgba(0,150,255,0.09);
            border-radius:5px;
            .tit{
                height: 45px;
                line-height: 45px;
                border-bottom: 1px solid #64a3d3;
                margin: 0 9px;
                margin-bottom: 10px;
            }
          
        }
        .right{
            flex: 1;
            width: 100px;
            box-shadow:0px 1px 4px 2px rgba(0,150,255,0.09);
            border-radius:5px;
            padding: 0 10px;
            .top{
                height: 45px;
                line-height: 45px;
                .mr10{
                    margin-left: 50%;
                    width: 10%;
                }
            }
            .bot{
                height: calc(100% - 45px);
            }
            .elinput{
                width: 20%;
                margin: 0 2% 0 5px;
            }
            .page{
                margin: 10px 0;
                float: right;
            }
            .el-pager li.active{
                background-color: #409baF !important;
                color: #fff;
            }
        }
    }
</style>
