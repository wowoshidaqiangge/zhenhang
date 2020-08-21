<template>
  <div class="chartContent" v-loading="loading">
    <div class="chart" id="planAchieveRate1"></div>
  </div>
</template>
<script>
import ElementUI from 'element-ui';
import { api } from '@/api/index1';
// 引入Charts
import Charts from '@jiaminghi/charts';
export default {
  data() {
    return {
      loading: false,
      timer:null,
      rate:''
    }
  },
  async  mounted() {
   await this.planAchieveRateFunc()
   await  this.getecharts()
  },
  created() { },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  methods: {
     getecharts (){
       let myChart = new Charts(document.getElementById('planAchieveRate1'));
          const option = {
            grid: {
              containLabel: true
            },
            series: [
              {
                type: 'gauge',
                center: ['50%', '45%'],
                radius: '60%',
                startAngle: -Math.PI / 2,
                endAngle: Math.PI * 1.5,
                arcLineWidth: 20,
                data: [
                  { name: 'itemA', value: this.rate, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'] }
                ],
                axisLabel: {
                  show: false
                },

                axisTick: {
                  show: false
                },
                pointer: {
                  show: false
                },
                dataItemStyle: {
                  lineCap: 'round'
                },
                details: {
                  show: true,
                  formatter: '{value}%',
                  style: {
                    fill: '#1ed3e5',
                    fontSize: 20
                  }
                }
              }
            ]
          }
          myChart.setOption(option);
          window.addEventListener("resize",function (){
            myChart.resize();
          });

    },
    // 设备运行情况
   async planAchieveRateFunc() {
     await api.planAchieveRate()
        .then(response => {
          // console.log(response);
          this.rate =   response.data.finishRate.replace("%", "");
          // console.log(rate)
         
          clearInterval(this.timer)
          this.timer = setInterval(()=>{
             this.planAchieveRateFunc()
          },10000)
          // myChart.prototype.setOption = function(option,animationEnd = false);
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