<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>图片上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="content-title">支持拖拽</div>
            <div class="plugins-tips">
                Element UI自带上传组件。
                访问地址：<a href="http://element.eleme.io/#/zh-CN/component/upload" target="_blank">Element UI Upload</a>
            </div>
            <el-upload
                class="upload-demo"
                drag
                action="http://jsonplaceholder.typicode.com/api/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div class="content-title">支持裁剪</div>
            <div class="plugins-tips">
                vue-cropperjs：一个封装了 cropperjs 的 Vue 组件。
                访问地址：<a href="https://github.com/Agontuk/vue-cropperjs" target="_blank">vue-cropperjs</a>
            </div>
            <div class="crop-demo">
                <img :src="cropImg" class="pre-img">
                <div class="crop-demo-btn">选择图片
                    <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                </div>
            </div>
        
            <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    export default {
        name: 'upload',
        data: function(){
            return {
                defaultSrc: require('../../assets/img/img.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
            }
        },
        components: {
            VueCropper
        },
        methods:{
            setImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            }
        },
        created(){
            this.cropImg = this.defaultSrc;
        }
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>
<!-- 大屏 
<template>
  <el-main class="global" v-loading="loading" element-loading-text="加载中。。。"
    element-loading-background="RGBA(0, 18, 53, 0.5)">
    <div class="header">
      <!-- <div class="leftWelcome">
        <div class="welcomeText">欢迎您，{{ userName }}</div>
      </div> -->
      <div class="centerTitle">
        <div class="title" @click="goControl">臻航生产管理系统</div>
      </div>
      <!-- <div class="rightTime">
        <div class="currentTime">{{ currentTmie }}</div>
        <div class="quit">退出</div>
      </div> -->
    </div>
    <div class="main">
      <div class="sideMain">
        <div class="chartBox">
          <div class="chartTitle">设备运行情况</div>
          <devOperation class="chartContent" @func="getCircleDateFunc"></devOperation>
        </div>
        <div class="chartBox">
          <div class="chartTitle">设备综合利用率</div>
          <!-- <div class="chartText"></div> -->
          <devUseRate class="chartContent"></devUseRate>
        </div>
        <div class="chartBox">
          <div class="chartTitle">一周产量趋势</div>
          <weekYield class="chartContent"></weekYield>
        </div>
      </div>
      <div class="centerMain">
        <div class="circleSection">
          <div class="circleBox">
            <div class="circleTitle">{{this.circleDate.monthYield}}</div>
            <div class="circleText">本月产量</div>
          </div>
          <div class="circleBox">
            <div class="circleTitle">{{this.circleDate.offCount}}</div>
            <div class="circleText">关机设备数</div>
          </div>
          <div class="circleBox">
            <div class="circleTitle">{{this.circleDate.runCount}}</div>
            <div class="circleText">运行设备总数</div>
          </div>
          <div class="circleBox">
            <div class="circleTitle">{{this.circleDate.useRate}}</div>
            <div class="circleText">设备使用率</div>
          </div>
        </div>
        <div class="devSection">
          <div class="devTitle">
            <div class="lefTitle">设备运行监控</div>
            <div class="rightIcon">
              <div class="greenIcon"></div>
              <div class="iconText">运行</div>
              <div class="blueIcon"></div>
              <div class="iconText">开机</div>
              <div class="redIcon"></div>
              <div class="iconText">故障</div>
              <div class="grayIcon"></div>
              <div class="iconText">关机</div>
            </div>
          </div>
          <div class="devSectionMain">
            <div class="devList" v-for="(v,m) in deviceTypeList1" :key="m" :style="{flex:v.flex}">
              <div class="devTextBox">
                <div class="devText">
                  <div class="text">{{v.deviceType}}</div>
                </div>
              </div>
              <div class="devRobotBox" v-for="(item,index) in v.deviceRunVo" :key='index'>
                <div :class="item.dev" v-if='!item.isdevice'>
                  <div :class="item.color"></div>
                  <div :class="item.class"></div>
                </div>
                <div class="devText" v-if='!item.isdevice'>{{item.deviceNameRecord}}</div>
                <div class="devTextOnly" v-if='item.isdevice'>
                  <div class="text">{{item.deviceNameRecord}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sideMain">
        <div class="chartBox">
          <div class="chartTitle">计划达成率</div>
          <planAchieveRate class="chartContent"></planAchieveRate>
        </div>
        <div class="chartBox">
          <div class="chartTitle">工单状态统计</div>
          <workStatus class="chartContent"></workStatus>
        </div>
        <div class="chartBox">
          <div class="chartTitle">设备工作效率排行</div>
          <!-- <div class="chartText"></div> -->
          <deviceEfficiency class="chartContent"></deviceEfficiency>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import ElementUI from 'element-ui';
import { api } from '@/api/index1'
import { userListMenu } from 'api/index'
import $ from 'jquery';
// 引入路由
import Routers from '@/router';
// 引入echarts
import echarts from 'echarts';
// 设备运行情况图表
import devOperation from './gloabalPage/devOperation'
// 设备综合利用率图表
import devUseRate from './gloabalPage/devUseRate'
// 一周产量趋势图表
import weekYield from './gloabalPage/weekYield'
// 计划达成率图表
import planAchieveRate from './gloabalPage/planAchieveRate'
// 工作状态统计图表
import workStatus from './gloabalPage/workStatus'
// 设备工作效率图表
import deviceEfficiency from './gloabalPage/deviceEfficiency'
export default {
  components: {
    devOperation,
    devUseRate,
    weekYield,
    planAchieveRate,
    workStatus,
    deviceEfficiency
  },
  data() {
    return {
      loading: true, // 未加载完成动画
      userName: sessionStorage.getItem('ms_username'),
      currentTmie: '', //当前时间
      currentTimer: {}, // 实时日期时间的定时器
      nextroute: '',
      deviceTypeList1: '', // 设备监控列表
      deviceTypeList2: '',
      circleDate: {
        monthYield: '',
        offCount: '',
        useRate: '',
        runCount: ''
      }  // 顶部圈内数据
    };
  },
  created() {
    var _this = this;
    this.currentTimer = window.setInterval(function () {
      // 创建当前系统时间的Date对象
      var dateObj = new Date();
      // 获取完整年份值
      var year = dateObj.getFullYear();
      // 获取月份
      var month = dateObj.getMonth() + 1;
      // 获取月份中的日
      var date = dateObj.getDate();
      // 获取星期值
      var day = dateObj.getDay();
      var weeks = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ];
      // 根据星期值，从数组中获取对应的星期字符串
      var week = weeks[day];
      // 获取小时
      var hour = dateObj.getHours();
      // 获取分钟
      var minute = dateObj.getMinutes();
      // 获取秒钟
      var second = dateObj.getSeconds();
      // 如果月、日、时、分、秒的值小于10，在前面补0
      if (month < 10) {
        month = '0' + month;
      }
      if (date < 10) {
        date = '0' + date;
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (minute < 10) {
        minute = '0' + minute;
      }
      if (second < 10) {
        second = '0' + second;
      }
      _this.currentTmie =
        year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second;
    }, 1000);
  },
  mounted() {
    //  const loading = this.$loading({
    //   //  customClass: 'create-isLoading',
    //     // lock: true,//lock的修改符--默认是false
    //     // // text: 'Loading',//显示在加载图标下方的加载文案
    //     // // spinner: 'el-icon-loading',//自定义加载图标类名
    //     // background: 'RGBA(0, 18, 53, 0.5)',//遮罩层颜色
    //     // target: document.querySelector('#table')//loading覆盖的dom元素节点
    // });
    this.deviceMonitorFunc()
    this.getuserListMenu()
  },
  computed: {},
  methods: {
    goControl() {
      this.$router.push({ path: `/${this.nextroute}` })
    },
    getuserListMenu() {
      userListMenu({ userId: sessionStorage.getItem('userId'),type:'menu' }).then(res => {
        if (res.code === '0') {
          if (Array.isArray(res.data) && res.data.length > 0) {
            this.nextroute = res.data[0].children[0].obj.index
          }
        }
      })
    },
    // API相关
    // 中间圈内数据
    getCircleDateFunc(deviceOperateList) {
      this.circleDate.offCount = deviceOperateList.offCount
      this.circleDate.useRate = deviceOperateList.useRate
      this.circleDate.runCount = deviceOperateList.runCount
      api.getCircleDate().then(response => {
        this.circleDate.monthYield = response.data.currentMonthYield
        console.log(this.circleDate)
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 设备运行监控
    deviceMonitorFunc() {
      this.loading = true
      api.deviceMonitor().then(response => {
        this.loading = false
        console.log(response.data);
        let deviceType1 = []
        let deviceType2 = []
        if (Array.isArray(response.data)) {
          response.data.map((item, index) => {
            if (index < 5) {
              item.deviceRunVo.map((v, m) => {
                if (m > 10) {
                  item.flex = '2'
                } else if(m=10){
                
                }else {
                  item.flex = '1'
                }
                if (v.state === '1') {
                  v.color = 'grayIcon'
                  v.class= 'robot robotgray'
                  v.dev = "devRobot devRobotgray"
                } else if (v.state === '2') {
                  v.color = 'blueIcon'
                  v.class= 'robot robotblue'
                  v.dev = "devRobot devRobotblue"
                } else if (v.state === '3') {
                  v.color = 'greenIcon'
                  v.class= 'robot robotgreen'
                  v.dev = "devRobot devRobotgreen"
                } else if (v.state === '0') {
                  v.color = 'redIcon'
                  v.class= 'robot robotred'
                  v.dev = "devRobot devRobotgray"
                }
              })
              deviceType1.push(item)
            } else if (index = 6) {
              item.deviceRunVo.map((v, m) => {
                if (m > 10) {
                  item.flex = '2'
                } else {
                  item.flex = '1'
                }
                if (v.state === '1') {
                  v.color = 'grayIcon'
                  v.class= 'robot robotgray'
                  v.dev = "devRobot devRobotgray"
                } else if (v.state === '2') {
                  v.color = 'blueIcon'
                  v.class= 'robot robotblue'
                  v.dev = "devRobot devRobotblue"
                } else if (v.state === '3') {
                  v.color = 'greenIcon'
                  v.class= 'robot robotgreen'
                  v.dev = "devRobot devRobotgreen"
                } else if (v.state === '0') {
                  v.color = 'redIcon'
                   v.class= 'robot robotred'
                   v.dev = "devRobot devRobotred"
                }
              })
              deviceType2.push(item)
            }
          })
        }
        let att = []
        att.push(...deviceType1[4].deviceRunVo, { deviceNameRecord: '动力类', isdevice: true }, ...deviceType2[0].deviceRunVo)
        let obj = { deviceRunVo: att, deviceType: '喷涂车间' }
        deviceType1[4] = obj
        console.log(att)
        // deviceType1[4] = 
        // console.log(response.data);
        // 设备监控设备状态
        this.deviceTypeList1 = deviceType1
        // this.deviceTypeList2 = deviceType2
        // console.log(this.deviceTypeList1)
      })
        .catch(function (error) {
          console.log(error);
        });
    },

  }
};
</script>
<style lang="less" scoped>
div {
  box-sizing: border-box;
}
.global {
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
  background: url('~@/assets/img/globalPage/background.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  // .create-isLoading{
  //   .el-loading-text{
  //     color:white;
  //   }
  // }

  .header {
    display: flex;
    width: 100%;
    background: url('~@/assets/img/globalPage/topTitle.png') no-repeat;
    background-size: 100% 100%;
    .leftWelcome {
      width: 300px;
      color: white;
      font-size: 20px;
      display: flex;
      line-height: 30px;
      .welcomeText {
        padding-left: 20px;
      }
    }
    .centerTitle {
      flex: 1;
      font-size: 30px;
      color: white;
      .title {
        height: 68px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        letter-spacing: 5px;
      }
    }
    .rightTime {
      width: 300px;
      color: white;
      font-size: 20px;
      display: flex;
      line-height: 30px;
      .currentTime {
        padding-left: 10px;
      }
      .quit {
        padding-left: 30px;
      }
    }
  }
  .main {
    display: flex;
    flex: 1;
    // height: 0; // 与下面overflow作用一样
    overflow: hidden;
    .sideMain {
      width: 24%;
      // display: flex;
      // flex-direction: column;
      // padding: 10px;
      .chartBox {
        // flex: 1;
        display: flex;
        flex-direction: column;
        height: 33%;
        background: url('~@/assets/img/globalPage/chartBox.png')
          no-repeat;
        background-size: 100% 100%;
        position: relative;
        .chartTitle {
         
          margin: 0 7% 0;
          height: 13%;
          // padding: 30px 5px;
          // width: 100%;
          // height: 7.8vh;
          display: flex;
          align-items: flex-end;
          color: #00f6ff;
          font-size: 14px;
          letter-spacing: 2px;
        }
        // .chartText {
        //   position: absolute;
        //   left: 50%;
        //   top: 70px;
        //   transform: translate(-50%, 50%);
        //   width: 80%;
        //   height: 20px;
        //   color: white;
        //   font-size: 13px;
        //   display: flex;
        //   justify-content: space-around;
        //   .textBox {
        //     width: 10%;
        //     height: 20px;
        //   }
        // }
        .chartContent {
          flex: 1;
         
         
          text-align: center;
        }
      }
    }
    .centerMain {
      // font-size: white;
      width: 52%;
      display: flex;
      flex-direction: column;
      padding: 10px 0 0 0;
      .circleSection {
        height: 18%;
        display: flex;
        .circleBox {
          display: flex;
          flex-direction: column;
          width: 25%;
          // line-height: 40px;
          .circleTitle {
            background: url('~@/assets/img/globalPage/circle.png')
              no-repeat;
            // background-size: cover;
            background-size: contain;
            background-position-x: center;
            color: #00f6ff;
            text-align: center;
            height: 75%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .circleText {
            text-align: center;
            font-size: 14px;
            color: white;
          }
        }
      }
      .devSection {
        height: 79%;
        display: flex;
        flex-direction: column;
        background: url('~@/assets/img/globalPage/middleBox.png')
          no-repeat;
        background-size: 100% 100%;
        // border-radius: 5px;
        margin-top: 10px;
        .devTitle {
          height: 8%;
          width: 100%;
          position: relative;
          .lefTitle {
            position: absolute;
            left: 15px;
            top: 10px;
            width: 100px;
            height: 20px;
            line-height: 20px;
            border-left: 2px solid #00f6ff;
            color: #00f6ff;
            text-align: center;
            font-size: 14px;
          }
          .rightIcon {
            position: absolute;
            right: 20px;
            top: 10px;
            width: 180px;
            height: 20px;
            display: flex;
            flex-direction: row;
            .greenIcon {
              width: 5px;
              height: 12px;
              margin: 4px;
              background: rgba(72, 227, 69, 1);
              border-radius: 2px;
            }
            .blueIcon {
              width: 5px;
              height: 12px;
              margin: 4px;
              background: #00f6ff;
              border-radius: 2px;
            }
            .redIcon {
              width: 5px;
              height: 12px;
              margin: 4px;
              background: #fff000;
              border-radius: 2px;
            }
            .grayIcon {
              width: 5px;
              height: 12px;
              margin: 4px;
              background: #ddd5d5;
              border-radius: 2px;
            }
            .iconText {
              margin-right: 5px;
              width: 40px;
              color: white;
              text-align: center;
              line-height: 20px;
              font-size: 12px;
            }
          }
        }
        .devSectionMain {
          position: relative;
          display: flex;
          flex: 1;
          flex-direction: column;
          .styleObj {
            position: absolute;
            left: 27%;
            bottom: 2.6%;
          }
          .devList {
            flex: 1;
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .styleObj {
              position: absolute;
              left: 40%;
              bottom: 10%;
            }
            .devTextBox {
              width: 9%;
              display: flex;
              flex-direction: column;
              .devText {
                margin: 0 auto;
                width: 2.5vw;
                height: 5.12vh;
                display: flex;
                flex-direction: column;
                .text {
                  font-weight: bold;
                  color: white;
                  font-size: 1.8vh;
                  letter-spacing: 0.3vh;
                  text-align: center;
                }
              }
            }
            .devRobotBox {
              width: 9%;
              display: flex;
              flex-direction: column;
              .devTextOnly {
                margin: 0 auto;
                width: 2.5vw;
                height: 5.12vh;
                display: flex;
                flex-direction: column;
                .text {
                  font-weight: bold;
                  color: white;
                  font-size: 1.8vh;
                  letter-spacing: 0.3vh;
                  text-align: center;
                }
              }
              .devRobotgray{
                border: 1px solid #ddd5d5;
                opacity: 0.5;
              }
              .devRobotgreen{
                border: 1px solid #43ff40;
              }
              .devRobotblue{
                border: 1px solid #00f6ff;

              }
              .devRobotred{
                border: 1px solid #fff000;
                
              }
              .devRobot {
                position: relative;
                margin: 0 auto;
                width: 2.5vw;
                height: 5.12vh;
                
                border-radius: 3px;
                .greenIcon {
                  position: absolute;
                  top: 9%;
                  left: 7%;
                  width: 10%;
                  height: 25%;
                  background: #43ff40;
                  border-radius: 2px;
                }
                .blueIcon {
                  position: absolute;
                  top: 9%;
                  left: 7%;
                  width: 10%;
                  height: 25%;
                  background: #00f6ff;
                  border-radius: 2px;
                }
                .redIcon {
                  position: absolute;
                  top: 9%;
                  left: 7%;
                  width: 10%;
                  height: 25%;
                  background: #fff000;
                  border-radius: 2px;
                }
                .grayIcon {
                  position: absolute;
                  top: 9%;
                  left: 7%;
                  width: 10%;
                  height: 25%;
                  background: rgba(164, 163, 163, 1);
                  border-radius: 2px;
                }
                .robot {
                  position: absolute;
                  top: 20%;
                  left: 16%;
                  width: 65%;
                  height: 65%;
                 
                }
                .robotgray{
                   background: url('~@/assets/img/globalPage/hui.png')
                      no-repeat;
                    background-size: 100% 100%;
                } 
                .robotgreen{
                   background: url('~@/assets/img/globalPage/green.png')
                      no-repeat;
                    background-size: 100% 100%;
                } 
                .robotblue{
                   background: url('~@/assets/img/globalPage/bule.png')
                      no-repeat;
                    background-size: 100% 100%;
                } 
                .robotred{
                   background: url('~@/assets/img/globalPage/yellow.png')
                      no-repeat;
                    background-size: 100% 100%;
                } 
              }
              .devText {
                color: white;
                text-align: center;
                font-size: 1.5vh;
                line-height: 3vh;
              }
            }
          }
        }
      }
    }
  }
}
</style>
