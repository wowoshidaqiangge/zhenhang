<template>
  <div class="repairrecord">
        <div class="top">
            <el-button type="add" icon="el-icon-circle-plus-outline" @click="recordAdd()">新增</el-button>
        </div>
        <div class="bot">
            <el-table :data="tableData" stripe :height="screenWidth" style="width: 100%">
                <el-table-column
                    v-for="(item,index) in columnlist"
                    :key="index"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                ></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                      <el-button
                          type="success"
                          plain
                          class="red"
                          @click="recordEdit(scope.$index, scope.row)"
                      >修改</el-button>
                        <el-button
                          v-if="scope.row.state"
                            type="success"
                            plain
                            @click="handleEdit(scope.$index, scope.row)"
                        >查看</el-button>
                        <el-button
                            type="danger"
                            plain
                            v-else
                            class="red"
                            @click="handledistribute(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination
                :background="true"
                :current-page.sync="pagesize"
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :total="totals"
            ></el-pagination>
        </div>
        <repairmodal
            :dialogFormVisible="dialogFormVisible"
            @close="close"
            :tit="tit"
            :ifEdt="ifEdt"
            ref="repairmodal"
        />
        <repairexamine
            :dialogFormVisible1="dialogFormVisible1"
            @close="close"
            ref="repairexamine"
        />
  </div>
</template>

<script>
import {repairrecordpage, mainrepairdel} from 'api/main'
import repairmodal from './repairmodal'
import repairexamine from './repairexamine'

export default {
    name: 'repairrecord',
    components:{
      repairmodal,
      repairexamine
    },
    data() {
        return {
            tableData: [],
             page:{
              current:1,
              size:10
            },
            dialogFormVisible:false,
            dialogFormVisible1: false,
            totals:0,
            tit: '',
            ifEdt: false,
            pagesize:1,
            screenWidth:'520px',
            columnlist:[
              {prop:'index',label:'序号'},
              {prop:'deviceName',label:'设备名称'},
              {prop:'deviceNumer',label:'设备编号'},
              {prop:'deviceModel',label:'规格型号'},
              {prop:'toType',label:'设备类型'},
              {prop:'fault',label:'故障原因'},
              {prop:'dateTime',label:'故障时间'},
              {prop:'finishDateTime',label:'完成时间'},
              {prop:'repairUserName',label:'维修人'},
              {prop:'checkUserName',label:'验收人'},
              {prop:'states',label:'维修状态'},
            ],
        }
    },
     computed: {
       
    },
    created(){
      this.getrepairrecordpage()
    },
    methods: {
      getrepairrecordpage() {
          repairrecordpage(this.page).then(res => {
            console.log(res)
              if (res.code === '0') {
                  res.data.records.map((item, index) => {
                      item.states = item.state? '已完成' : '待检修';
                      item.index = index + 1;
                  });
                  this.pagesize = parseInt(res.data.current);
                  this.totals = parseInt(res.data.total);
                  this.tableData = res.data.records;
              }
          });
      },
      // 新增
      recordAdd(){
          this.tit = '新增'
          this.dialogFormVisible = true
      },
      // 修改
      recordEdit(h,m){
        console.log(h)
        this.tit= '修改'
        this.ifEdt = true
        this.$refs.repairmodal.getmainrepairid({id:m.id})
        this.dialogFormVisible = true
      },
      // 查看
      handleEdit(h,m){
        console.log(h)
        this.$refs.repairexamine.getmainrepairid({id:m.id})
        this.dialogFormVisible1 = true
      },
      handleCurrentChange(val){
        this.page.current = val
        this.getmainrecordpage()
      },
    close(num){
        this.dialogFormVisible = false
        this.dialogFormVisible1 = false
        console.log(this.dialogFormVisible1)
        if(num==='0'){
            this.getrepairrecordpage()
        }
    },
    // 删除
    handledistribute(h,m){
        mainrepairdel(m).then(res=>{
            if(res.code==='0'){
                this.$message.success(res.msg)
                this.getrepairrecordpage()
            }
        })
    }
    }
}
</script>


<style lang='less'>
.repairrecord {
    width: 100%;
    height: 100%;
    .top {
        height: 45px;
        line-height: 45px;
        .mr10 {
            margin-left: 50%;
            width: 10%;
        }
    }
    .elinput {
        width: 20%;
        margin: 0 2% 0 5px;
    }
    .page {
        margin-top: 10px;
        float: right;
    }
    .el-pager li.active {
        background-color: #409baf !important;
        color: #fff;
    }
}
</style>
