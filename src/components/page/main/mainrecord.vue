<template>
    <div class="mainrecord">
        <div class="top">
          <el-date-picker
            v-model="maintime"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
            <el-input
              placeholder="请输入设备名称或设备编号"
              prefix-icon="el-icon-search"
              v-model="deviceSearch">
            </el-input>
             <el-select v-model="state" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button class="searchBtn" size="mini" type="add" @click="searchmain()">查询</el-button>
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
                          v-if="scope.row.state"
                            type="success"
                            plain
                            @click="examine(scope.$index, scope.row)"
                        >查看</el-button>
                        <el-button
                            type="success"
                            plain
                            v-else
                            class="red"
                            @click="handledistribute(scope.$index, scope.row)"
                        >填报</el-button>
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
        <recordmodal
            :dialogFormVisible="dialogFormVisible"
            @close="close"
            :tit="tit"
            :ifEdt="ifEdt"
            ref="recordmodal"
        />
    </div>
</template>

<script>
import {mainrecordpage} from 'api/main';
import recordmodal from './recordmodal'

export default {
    name: 'mainrecord',
    components: {
      recordmodal
    },
    data() {
        return {
            deviceSearch: '',
            maintime: [],
            state: '',
            options: [{
              label: '全部',
              value: ''
            }, {
              label: '未保养',
              value: 0
            }, {
              label: '已保养',
              value: 1
            }],
            tableData: [],
             page:{
              current:1,
              size:10,
            },
            tit:'',
            ifEdt: false,
            totals:0,
            pagesize:1,
            screenWidth:'520px',
            dialogFormVisible: false,
            columnlist:[
              {prop:'index',label:'序号'},
              {prop:'deviceName',label:'设备名称'},
              {prop:'deviceNumer',label:'设备编号'},
              {prop:'deviceModel',label:'规格型号'},
              {prop:'toType',label:'设备类型'},
              {prop:'category',label:'保养类别'},
              {prop:'period',label:'保养周期'},
              {prop:'dateTime',label:'保养时间'},
              {prop:'assumeUserName',label:'担当人'},
              {prop:'dutyUserName',label:'责任人'},
              {prop:'createTime',label:'新增时间'},
              {prop:'remark',label:'备注'},
              {prop:'states',label:'状态'},
            ],
        };
    },
    computed: {},
    created() {
      this.getmainrecordpage()
    },
    methods: {
      searchmain () {
        var patrn = /^[0-9]{1,20}$/
        if (patrn.exec(this.deviceSearch)) {
          this.page.deviceNumber = this.deviceSearch
        } else {
          this.page.deviceName = this.deviceSearch
        }
        this.page.state = this.state
        console.log(this.maintime)
        if(this.maintime !== null) {
          this.page.beginDate = this.maintime[0]
          this.page.endDate = this.maintime[1]
        } else {
          this.page.beginDate = ''
          this.page.endDate = ''
        }
        this.getmainrecordpage()
      },
      getmainrecordpage() {
          mainrecordpage(this.page).then(res => {
              if (res.code === '0') {
                  res.data.records.map((item, index) => {
                      item.states = item.state? '已保养' : '未保养';
                      item.index = index + 1;
                  });
                  this.pagesize = parseInt(res.data.current);
                  this.totals = parseInt(res.data.total);
                  this.tableData = res.data.records;
                  console.log(this.tableData)
              }
          });
      },
      // 查看
      examine(h,m){
        console.log(h)
        this.tit= '查看'
        this.ifEdt = false
        this.$refs.recordmodal.getmainrecordid({id:m.id})
        this.dialogFormVisible = true
      },
      // 填报
      handledistribute(h,m){
        console.log(h)
        this.tit= '填报'
        this.ifEdt = true
        this.$refs.recordmodal.getmainrecordid({id:m.id})
        this.dialogFormVisible = true
      },
      handleCurrentChange(val){
        this.page.current = val
        this.getmainrecordpage()
      },
      close(num){
        this.dialogFormVisible = false
        if(num==='0'){
          this.getmainrecordpage()
        }
      },
    }
};
</script>


<style lang='less'>
.mainrecord {
    width: 100%;
    height: 100%;
    .top {
        height: 45px;
        line-height: 45px;
        display: flex;
        justify-content: flex-end;
        margin: 0 70px;
        .mr10 {
          margin-left: 50%;
          width: 10%;
        }
        .searchBtn {
          height: 33px;
          margin-top: 5px;
          margin-left: 20px;
        }
        .el-range-editor--small.el-input__inner {
          height: 32px;
          margin-top: 7px;
        }
        .el-input--small {
          width: 220px;
          margin-left: 20px;
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
