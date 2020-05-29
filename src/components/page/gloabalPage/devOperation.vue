<template>
  <div class="chartContent">
    <div class="chart" id="deviceOperation"></div>
  </div>
</template>
<script>
import { api } from '@/api/index1';
// 引入echarts
import echarts from 'echarts';
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.deviceOperationFunc()
  },
  created() { },
  methods: {
    // 设备运行情况
    deviceOperationFunc() {
      api.deviceOperation()
        .then(response => {
          // console.log(response);
          let myChart = echarts.init(document.getElementById('deviceOperation'));
          let res = {
            name: ["关机", "开机", "运行"],
            value: [
              { value: response.data.offCount, name: "关机" },
              { value: response.data.onCount, name: "开机" },
              { value: response.data.runCount, name: "运行" }
            ]
          };
          let option = {
            name: '设备运行情况',
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            grid: {
              containLabel: true
            },
            legend: {
              show: true,
              orient: 'vertical',
              right: "10%",
              top: "20%",
              data: [
                '关机',
                '开机',
                '运行'
              ],
              data: res.name,
              formatter: function (name) {
                var total = 0;
                var target;
                for (var i = 0, l = res.value.length; i < l; i++) {
                  total += res.value[i].value;
                  if (res.value[i].name === name) {
                    target = res.value[i].value;
                  }
                }
                return name + "： " + ((target / total) * 10000).toFixed(2) + "%";
              },
              // formatter: function (name) {
              //   let rate = [
              //     { value: response.data.offRate, name: "关机" },
              //     { value: response.data.onRate, name: "开机" },
              //     { value: response.data.runRate, name: "运行" }
              //   ]
              //   let target;
              //   for (var i = 0; i < rate.length; i++) {
              //     if (rate.value[i].name === name) {
              //       target = rate.value[i].value;
              //     }
              //   }
              //   return name + " " + target;
              // },
              textStyle: {
                color: "#fff"
              }
            },
            series: [
              {
                name: '设备运行情况',
                type: 'pie',
                radius: '65%',
                center: ['35%', '45%'],
                label: {
                  position: 'inside',
                  show: false
                },
                data: [
                  { value: response.data.offCount, name: '关机' },
                  { value: response.data.onCount, name: '开机' },
                  { value: response.data.runCount, name: '运行' },
                ],
                // emphasis: {
                //   itemStyle: {
                //     shadowBlur: 10,
                //     shadowOffsetX: 0,
                //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                //   }
                // }
              }
            ],
            color: ['#EB6F43', '#6BCAFA', '#FFFE7E']
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
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>