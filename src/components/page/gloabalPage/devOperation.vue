<template>
  <div class="chartContent" v-loading="loading">
    <div class="chart" id="deviceOperation"></div>
  </div>
</template>
<script>
import ElementUI from 'element-ui';
import { api } from '@/api/index1';
// 引入echarts
import echarts from 'echarts';
export default {
  data() {
    return {
      loading: false,
      timer: null
    }
  },
  mounted() {
    // this.timer = setInterval(() => {
    this.deviceOperationFunc()
    // }, 5000)
  },
  created() { },
  beforeDestroy(){
     clearInterval(this.timer)
  },
  methods: {
    // 设备运行情况
    deviceOperationFunc() {
      api.deviceOperation()
        .then(response => {
        
          let myChart = echarts.init(document.getElementById('deviceOperation'));
          let res = {
            name: ["关机", "开机", "运行"],
            value: [
              { value: response.data.offCount, name: "关机", rate: response.data.offRate },
              { value: response.data.onCount, name: "开机", rate: response.data.onRate },
              { value: response.data.runCount, name: "运行", rate: response.data.runRate }
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
            legend:[
              {
                    orient: 'vertical',
                    x : '62%',
                    y : '18%',
                    align: 'left',
                    data: ['关机'],
                    formatter: function (name) {
                        // var total = 0;
                        var target;
                        for (var i = 0; i < res.value.length; i++) {
                          // total += res.value[i].value;
                          if (res.value[i].name === name) {
                            target = res.value[i].rate;
                          }
                        }
                        return name + "： " + target;
                    },
                    textStyle:{
                        color:'#fff'
                    }

                },
                {
                    orient: 'vertical',
                    x : '62%',
                    y : '38%',
                    align: 'left',
                    data: ['开机'],
                    formatter: function (name) {
                        // var total = 0;
                        var target;
                        for (var i = 0; i < res.value.length; i++) {
                          // total += res.value[i].value;
                          if (res.value[i].name === name) {
                            target = res.value[i].rate;
                          }
                        }
                        return name + "： " + target;
                    },
                    textStyle:{
                      
                        color:'#fff'
                    }
                },
                {
                    orient: 'vertical',
                    x : '62%',
                    y : '58%',
                    align: 'left',
                    data: ['运行'],
                    formatter: function (name) {
                        // var total = 0;
                        var target;
                        for (var i = 0; i < res.value.length; i++) {
                          // total += res.value[i].value;
                          if (res.value[i].name === name) {
                            target = res.value[i].rate;
                          }
                        }
                        return name + "： " + target;
                    },
                    textStyle:{
                      
                        color:'#fff'
                    }

                }

            ],
            //  {
            //   show: true,
            //   orient: 'vertical',
            //   right: "10%",
            //   top: "20%",
            //   // data: [
            //   //   '关机',
            //   //   '开机',
            //   //   '运行'
            //   // ],
            //   data: res.name,
            //   formatter: function (name) {
            //     // var total = 0;
            //     var target;
            //     for (var i = 0; i < res.value.length; i++) {
            //       // total += res.value[i].value;
            //       if (res.value[i].name === name) {
            //         target = res.value[i].rate;
            //       }
            //     }
            //     return name + "： " + target;
            //   }
             
            // },
            series: [
              {
                name: '设备运行情况',
                type: 'pie',
                radius: ['45%', '70%'],
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
            color: ['#a4a3a3', '#408bff', '#48e345']
          };
          myChart.setOption(option, (window.onresize = myChart.resize));
          clearInterval(this.timer)
           this.timer = setInterval(() => {
              this.deviceOperationFunc()
         }, 10000)
          this.$emit('func', response.data)
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