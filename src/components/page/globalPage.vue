<!-- 大屏 -->
<template>
  <div class="global">
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
          <devOperation class="chartContent"></devOperation>
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
            <div class="circleTitle">78</div>
            <div class="circleText">本月产量</div>
          </div>
          <div class="circleBox">
            <div class="circleTitle">12</div>
            <div class="circleText">关机设备数</div>
          </div>
          <div class="circleBox">
            <div class="circleTitle">88</div>
            <div class="circleText">运行设备总数</div>
          </div>
          <div class="circleBox">
            <div class="circleTitle">71%</div>
            <div class="circleText">设备使用率</div>
          </div>
        </div>
        <div class="devSection">
          <div class="devTitle">
            <div class="lefTitle">设备运行监控</div>
            <div class="rightIcon">
              <div class="greenIcon"></div>
              <div class="iconText">生产</div>
              <div class="blueIcon"></div>
              <div class="iconText">开机</div>
              <div class="redIcon"></div>
              <div class="iconText">故障</div>
              <div class="grayIcon"></div>
              <div class="iconText">关机</div>
            </div>
          </div>
          <div class="devList">
            <div class="devTextBox">
              <div class="devText">
                <div class="text">冲压</div>
                <div class="text">车间</div>
              </div>
            </div>
            <div class="devRobotBox" v-for="(item,index) in deviceFirstLine" :key='index'>
              <div class="devRobot">
                <div :class="deviceTypeColor[index]"></div>
                <div class="robot"></div>
              </div>
              <div class="devText">{{deviceNameList[index]}}</div>
            </div>
          </div>
          <div class="devList">
            <div class="devTextBox">
              <div class="devText">
                <div class="text">封装</div>
                <div class="text">车间</div>
              </div>
            </div>
            <div class="devRobotBox" v-for="(item,index) in deviceSecondLine" :key='index'>
              <div class="devRobot">
                <div :class="deviceTypeColor[index]"></div>
                <div class="robot"></div>
              </div>
              <div class="devText">{{deviceNameList[index]}}</div>
            </div>
          </div>
          <div class="devList">
            <div class="devRobotBox" v-for="(item,index) in deviceThirdLine" :key='index'>
              <div class="devRobot">
                <div :class="deviceTypeColor[index]"></div>
                <div class="robot"></div>
              </div>
              <div class="devText">{{deviceNameList[index]}}</div>
            </div>
          </div>
          <div class="devList">
            <div class="devTextBox">
              <div class="devText">
                <div class="text">包装</div>
                <div class="text">车间</div>
              </div>
            </div>
            <div class="devRobotBox" v-for="(item,index) in deviceFourthLine" :key='index'>
              <div class="devRobot">
                <div :class="deviceTypeColor[index]"></div>
                <div class="robot"></div>
              </div>
              <div class="devText">{{deviceNameList[index]}}</div>
            </div>
          </div>
          <div class="devList">
            <div class="devTextBox">
              <div class="devText">
                <div class="text">纸芯</div>
                <div class="text">车间</div>
              </div>
            </div>
            <div class="devRobotBox" v-for="(item,index) in deviceFifthLine" :key='index'>
              <div class="devRobot">
                <div :class="deviceTypeColor[index]"></div>
                <div class="robot"></div>
              </div>
              <div class="devText">{{deviceNameList[index]}}</div>
            </div>
          </div>
          <div class="devList">
            <div class="devRobotBox" v-for="(item,index) in deviceSixthLine" :key='index'>
              <div class="devRobot">
                <div :class="deviceTypeColor[index]"></div>
                <div class="robot"></div>
              </div>
              <div class="devText">{{deviceNameList[index]}}</div>
            </div>
            <div class="devTextBox">
              <div class="devText">
                <div class="text">喷涂</div>
                <div class="text">车间</div>
              </div>
            </div>
            <div class="devRobotBox" v-for="(item,index) in deviceSeventhLine" :key='index'>
              <div class="devRobot">
                <div :class="deviceTypeColor[index]"></div>
                <div class="robot"></div>
              </div>
              <div class="devText">{{deviceNameList[index]}}</div>
            </div>
            <div class="devTextBox">
              <div class="devText">
                <div class="text">动力</div>
                <div class="text">车间</div>
              </div>
            </div>
            <div class="devRobotBox" v-for="(item,index) in deviceEighthLine" :key='index'>
              <div class="devRobot">
                <div :class="deviceTypeColor[index]"></div>
                <div class="robot"></div>
              </div>
              <div class="devText">{{deviceNameList[index]}}</div>
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
  </div>
</template>

<script>
import { api } from '@/api/index1'
import {userListMenu} from 'api/index'
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
      userName: localStorage.getItem('ms_username'),
      currentTmie: '', //当前时间
      currentTimer: {}, // 实时日期时间的定时器
      deviceTypeColor: [], //设备运行监控状态绑定class
      deviceNameList: [], // 设备监控设备名简称,
      nextroute:'',
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
    $(document).ready(
      function () {
        var that = this;
        let topTitleHeight = $('.header').height();
        let mainHeight = $(window).height() - topTitleHeight;
        $('.main').height(mainHeight);
      }.bind(this)
    );
    this.deviceMonitorFunc()
    this.getuserListMenu()
  },
  computed: {
       
    deviceFirstLine() {
      return this.deviceTypeColor.slice(0, 9);
      return this.deviceNameList.slice(0, 9);
    },
    deviceSecondLine() {
      return this.deviceTypeColor.slice(24, 34);
      return this.deviceNameList.slice(24, 34);
    },
    deviceThirdLine() {
      return this.deviceTypeColor.slice(34, 40);
      return this.deviceNameList.slice(34, 40);
    },
    deviceFourthLine() {
      return this.deviceTypeColor.slice(40, 50);
      return this.deviceNameList.slice(40, 50);
    },
    deviceFifthLine() {
      return this.deviceTypeColor.slice(9, 19);
      return this.deviceNameList.slice(9, 19);
    },
    deviceSixthLine() {
      return this.deviceTypeColor.slice(19, 24);
      return this.deviceNameList.slice(19, 24);
    },
    deviceSeventhLine() {
      return this.deviceTypeColor.slice(50, 52);
      return this.deviceNameList.slice(50, 52);
    },
    deviceEighthLine() {
      return this.deviceTypeColor.slice(52, 54);
      return this.deviceNameList.slice(52, 54);
    },
  },
  methods: {
    goControl() {
      this.$router.push({ path: `/${this.nextroute}` })
    },
    getuserListMenu(){
          userListMenu({id:localStorage.getItem('userId')}).then(res=>{
            if(res.code==='0'){
              if(Array.isArray(res.data)&&res.data.length>0){
                this.nextroute =  res.data[0].children[0].obj.index
              }
            }
          })
     },      
    // API相关
    // 设备运行监控
    deviceMonitorFunc() {
      api.deviceMonitor()
        .then(response => {
          console.log(response);
          let deviceType = []
          let deviceName = []
          for (let i = 0; i < response.data.length; i++) {
            for (let j = 0; j < response.data[i].deviceRunVo.length; j++) {
              if (response.data[i].deviceRunVo[j].state == '0') {
                deviceType.push('redIcon')
              } else if (response.data[i].deviceRunVo[j].state == '1') {
                deviceType.push('grayIcon')
              } else if (response.data[i].deviceRunVo[j].state == '2') {
                deviceType.push('blueIcon')
              } else if (response.data[i].deviceRunVo[j].state == '3') {
                deviceType.push('greenIcon')
              }
              deviceName.push(response.data[i].deviceRunVo[j].deviceNameRecord)
              // deviceType.push(response.data[i].deviceRunVo[j].state)
            }
          }
          // 设备监控设备状态
          this.deviceTypeColor = deviceType
          // 设备监控设备名简称
          this.deviceNameList = deviceName
          console.log(this.deviceTypeColor)
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
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
  background: url('~@/assets/img/globalPage/background.png') no-repeat;
  background-size: 100% 100%;
  .header {
    display: flex;
    height: 68px;
    width: 100%;
    background: url('~@/assets/img/globalPage/topTitle.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
        justify-content: center;
        text-align: center;
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
    padding-bottom: 30px;
    .sideMain {
      width: 24%;
      // display: flex;
      // flex-direction: column;
      // padding: 10px;
      .chartBox {
        // flex: 1;
        height: 33%;
        background: url('~@/assets/img/globalPage/chartBox.png')
          no-repeat;
        background-size: 100% 105%;
        position: relative;
        .chartTitle {
          position: absolute;
          background: url('~@/assets/img/globalPage/chartTitle.png')
            no-repeat;
          background-size: 65% 70%;
          background-position-x: center;
          background-position-y: 31px;
          margin: 0px 5px 4px;
          text-align: center;
          padding: 30px 5px;
          width: 100%;
          height: 70px;
          line-height: 31px;
          color: #00f6ff;
          font-size: 14px;
          letter-spacing: 2px;
        }
        .chartText {
          position: absolute;
          left: 50%;
          top: 70px;
          transform: translate(-50%, 50%);
          width: 80%;
          height: 20px;
          color: white;
          font-size: 13px;
          display: flex;
          justify-content: space-around;
          .textBox {
            width: 10%;
            height: 20px;
          }
        }
        .chartContent {
          // flex: 1;
          height: 100%;
          padding-top: 70px;
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
            height: 70%;
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
        background: rgba(0, 203, 210, 0.25);
        border-radius: 5px;
        margin-top: 10px;
        .devTitle {
          height: 10%;
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
            width: 200px;
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
              background: rgba(64, 139, 255, 1);
              border-radius: 2px;
            }
            .redIcon {
              width: 5px;
              height: 12px;
              margin: 4px;
              background: rgba(234, 94, 6, 1);
              border-radius: 2px;
            }
            .grayIcon {
              width: 5px;
              height: 12px;
              margin: 4px;
              background: rgba(164, 163, 163, 1);
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
        .devList {
          height: 15%;
          width: 100%;
          display: flex;
          flex-direction: row;
          .devTextBox {
            width: 9%;
            display: flex;
            flex-direction: column;
            .devText {
              margin: 0 auto;
              width: 48px;
              height: 48px;
              display: flex;
              flex-direction: column;
              .text {
                font-weight: bold;
                color: white;
                font-size: 16px;
                letter-spacing: 3px;
                text-align: center;
              }
            }
          }
          .devRobotBox {
            width: 9%;
            display: flex;
            flex-direction: column;
            .devRobot {
              position: relative;
              margin: 0 auto;
              width: 48px;
              height: 48px;
              border: 1px solid rgba(0, 246, 255, 0.6);
              .greenIcon {
                position: absolute;
                top: 3px;
                left: 3px;
                width: 5px;
                height: 12px;
                background: rgba(72, 227, 69, 1);
                border-radius: 2px;
              }
              .blueIcon {
                position: absolute;
                top: 3px;
                left: 3px;
                width: 5px;
                height: 12px;
                background: rgba(64, 139, 255, 1);
                border-radius: 2px;
              }
              .redIcon {
                position: absolute;
                top: 3px;
                left: 3px;
                width: 5px;
                height: 12px;
                background: rgba(234, 94, 6, 1);
                border-radius: 2px;
              }
              .grayIcon {
                position: absolute;
                top: 3px;
                left: 3px;
                width: 5px;
                height: 12px;
                background: rgba(164, 163, 163, 1);
                border-radius: 2px;
              }
              .robot {
                position: absolute;
                top: 9px;
                left: 7px;
                width: 31px;
                height: 31px;
                background: url('~@/assets/img/globalPage/robot.png')
                  no-repeat;
                background-size: 100% 100%;
              }
            }
            .devText {
              color: white;
              text-align: center;
              font-size: 13px;
              line-height: 27px;
            }
          }
        }
      }
    }
  }
}
</style>
