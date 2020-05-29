<template>
  <div class="chartContent">
    <div class="chartText">
      <div class="textBox" v-for="(item,index) in useRateList" :key='index' v-if="item.useRate||item.useRate==0">
        {{item.useRate}}</div>
    </div>
    <div class="chart" id="devUseRate"></div>
  </div>

</template>
<script>
import { api } from '@/api/index1';
// 引入echarts
import echarts from 'echarts';
export default {
  data() {
    return {
      useRateList: [
        { deviceName: '', useRate: '', useRateOrder: '' }
      ]
    }
  },
  mounted() {
    this.devUseRateFunc()
  },
  created() { },
  methods: {
    // 设备综合利用率
    devUseRateFunc() {
      api.devUseRate()
        .then(response => {
          // console.log(response);
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].useRateOrder = (response.data[i].useRateOrder * 100).toFixed(2)
          }

          let res = response.data;
          this.useRateList = res;
          let xarr = []
          let yarr = []
          res.map(item => {
            xarr.push(item.deviceName)
            yarr.push(item.useRateOrder)
          })
          // debugger
          let myChart = echarts.init(document.getElementById('devUseRate'));
          let option = {
            color: ["#78C6A2"],
            textStyle: {
              color: "white"
            },
            xAxis: {
              type: 'category',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false,
                interval: 0
              },
              // axisLabel: {
              //   interval: 0
              // },
              data: xarr
            },
            yAxis: {
              show: false,
              max: 100
            },
            tooltip: {
              trigger: "axis",
              formatter: '设备综合利用率<br/>{b}：{c}%'
            },
            grid: {
              left: "5%",
              right: "12%",
              // height: "100%",
              top: "5%",
              bottom: "20%",
              containLabel: true
            },
            series: [{
              data: yarr,
              // itemStyle: {
              //   normal: {
              //     label: {
              //       show: true, //开启显示
              //       position: 'top', //在上方显示
              //       textStyle: { //数值样式
              //         color: 'black',
              //         fontSize: 16
              //       }
              //     }
              //   }
              // },
              type: 'bar',
              barWidth: "50%",
              showBackground: true,
              backgroundStyle: {
                color: '#FEFEFE'
              }
            }]
          };

          myChart.setOption(option, (window.onresize = myChart.resize));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>
<style lang="less" scoped>
.chartContent {
  .chartText {
    position: absolute;
    left: 50%;
    top: 70px;
    transform: translate(-50%, 50%);
    width: 77%;
    height: 20px;
    color: white;
    font-size: 13px;
    display: flex;
    flex-direction: row;
    .textBox {
      width: 14.28%;
      height: 20px;
      text-align: center;
    }
  }
  .chart {
    padding-top: 20px;
    width: 100%;
    height: 100%;
  }
}
</style>