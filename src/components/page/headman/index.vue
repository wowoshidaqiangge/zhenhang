<template>
  <div class="headman">
    <div class="top">
      <v-head
        :fullScreenVis="false"
        :msgVis="false"
        :fixColorObj="{ color: '#fff' }"
      ></v-head>
    </div>
    <div style="flex:1;overflow:auto">
      <div
        class="headnum"
        v-for="(item, index) in listuser"
        :key="index"
      >
        <div class="p1 p0">
          <p>{{ item.taskNumber }}</p>
          <p
            class="but"
            :class="item.state === '2' ? 'but1' : 'but2'"
          >
            {{ item.taskPlanState }}
          </p>
        </div>
        <div class="p2 p0">
          <span>{{ item.partNumber }}&nbsp;</span>
          <!-- <span v-if="item.itemCode">
            ({{ item.itemCode }}，{{ item.material }})</span
          > -->
        </div>
         <div class="p0">
          <p>单号及状态:</p>
          <p>{{ item.taskNumber }} ({{ item.taskPlanState }})</p>
        </div>
        <div class="p0">
          <p>元件名称:</p>
          <p>{{ item.partName }}</p>
        </div>
        
        <div class="p0">
          <p>计划产量:</p>
          <p>{{ item.planYield }}</p>
        </div>
       
        <div class="p0">
          <p>已生产数:</p>
          <p>{{ item.nowCount }}</p>
        </div>
        <div class="p0">
          <p>备    注:</p>
          <p style="width:65%;height:44px;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
"
           :title="item.remark">{{item.remark}}</p>
        </div>
        <div class="progre">
          <el-progress
            type="circle"
            :percentage="percenage1(item.produceProgress)"
            :width="60"
          ></el-progress>
        </div>
        <div class="sub">
          <el-button
            type="success"
            size="mini"
           
            @click="lookfile(item)"
            >关联部件</el-button
          >
          <el-button
            type="info"
            size="mini"
            v-if="item.technologyName"
            @click="technology(item)"
            >查看工艺</el-button
          >
          <el-button
            type="primary"
            size="mini"
            v-if="item.state === '2'"
            @click="goToPay(item)"
            >领单</el-button
          >
          <el-button
            type="add"
            size="mini"
            v-if="item.state === '3'"
            @click="job(item)"
            >报工</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog
      title="领单"
      :visible.sync="dialogVisible"
      width="40%"
      :destroy-on-close="true"
      :before-close="beforclose"
      center
    >
      <p class="modaltit">请刷取您的员工卡完成领单！</p>
      <el-input
        class="idnum"
        v-model="input"
        placeholder="员工卡号"
        ref="getFocus"
        @keyup.enter.native="search()"
      ></el-input>
    </el-dialog>
    <bookingModal
      :dialogVisible1="dialogVisible1"
      @close="close"
      :modalinfo="modalinfo"
      ref="bookmodal"
    />
    <fileModel :dialogFormVisiblefile='dialogFormVisiblefile' @closefile='closefile' :titfile='titfile' ref="filemodel"/>
  </div>
</template>

<script>
import { listByUserId, updateTaskPlanClaimById } from 'api/index';
import vHead from 'components/common/Header.vue';
import bookingModal from './bookingModal';
import fileModel from './taskmodel'
export default {
  name: 'headman',
  components: {
    vHead,
    bookingModal,fileModel
  },
  data() {
    return {
      listuser: [],
      dialogVisible: false,
      input: '',
      dialogVisible1: false,
      modalinfo: {},
      goToPayinfo: '',
      icCard: sessionStorage.getItem('icCard'),
      dialogFormVisiblefile:false,
      titfile:'关联部件'
    };
  },
  computed: {
    percenage1() {
      return function(value) {
        if (!value) {
          value = 0;
        }
        return parseInt(value);
      };
    }
  },
  created() {
    this.getlistByUserId();
  },
  methods: {
    closefile(){
      this.dialogFormVisiblefile= false
    },
    lookfile(val){
      this.dialogFormVisiblefile= true
      this.$refs.filemodel.getall(val)
    },
    search() {
      if (this.icCard === this.input) {
        updateTaskPlanClaimById(this.goToPayinfo).then(res => {
          if (res.code === '0') {
            this.$message.success(res.msg);
            this.dialogVisible = false;
            this.input = '';
            this.getlistByUserId();
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        this.$message.error('卡号与登录者卡号不符！');
      }
    },
    goToPay(item) {
      this.goToPayinfo = item;
      this.dialogVisible = true;
      this.$nextTick(function() {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          // 100毫秒延迟解决第二次打开弹框，输入框不自动获取焦点的bug
          this.$refs.getFocus.focus();
        }, 100);
      });
    },
    getlistByUserId() {
      listByUserId().then(res => {
        if (res.code === '0') {
          this.listuser = res.data;
        }
      });
    },
    methodGetByteLen(value) {},
    beforclose() {
      this.dialogVisible = false;
      this.input = '';
    },
    job(info) {
      this.$refs.bookmodal.getform(info);
      this.dialogVisible1 = true;
    },
    close(num) {
      this.dialogVisible1 = false;
      if (num === '0') {
        this.getlistByUserId();
      }
    },
    technology(item) {
      // debugger
      window.open(item.technology);
    }
  }
};
</script>

<style lang="less">
.headman {
  width: 100%;
  height: 100%;
  background: #e9e9e9;
  display: flex;
  flex-direction: column;
  .top {
    background-color: #409baf;
    .header {
      color: #fff;
    }
  }
  .headnum {
    width: 23%;
    margin: 1%;
    float: left;
    padding: 5px 0;
    background-color: #fff;
    position: relative;
    border-radius: 5px;
    .progre {
      position: absolute;

      right: 4%;
      bottom: 23%;
    }
    .p0 {
      display: flex;
      padding: 2px 4%;
      p {
        
        line-height: 22px;
        font-size: 15px;
      }
      .but {
        padding: 0 8px;
        height: 22px;
        border-radius: 11px;
        border: 1px solid #bdbdbd;
        text-align: center;
        cursor: pointer;
        font-size: 12px;
      }
      .but1 {
        border: 1px solid #02a202;
        color: #02a202;
      }
      .but2 {
        border: 1px solid #ff9800;
        color: #ff9800;
      }
      p:nth-of-type(1) {
        margin-right: 5px;
      }
    }
    .p1 {
      font-size: 13px;
      p:nth-of-type(1) {
        flex: 1;
      }
    }
    .p2 {
      margin: 10px 0;

      span {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .sub {
      float: right;
      padding: 12px 4%;
      height: 28px;
    }
  }
  .el-dialog__header {
    background-color: #409baf;

    .el-dialog__title {
      color: #fff;
      letter-spacing: 2px;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }
  .modaltit {
    text-align: center;
    font-size: 20px;
    letter-spacing: 3px;
    padding: 40px 0;
  }
  .idnum {
    width: 45%;
    margin-left: 26%;
    padding-bottom: 70px;
  }
}
</style>
<style>
.top >>> .user-name >>> .fix-color {
  color: #fff;
}
</style>
