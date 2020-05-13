<template>
  <div class="charts">
      <v-chart ref='chart' :options="option" :auto-resize="true" class="chart"/>
  </div>
</template>

<script>
// import { selectDeviceMaintainList } from 'api/index'
export default {
    name: 'charts',
    props:{
        numlist:{
            type:Array
        },
        devicelist:{
            type:Array
        }
    },
    data() {
        return {
            option:{

            },
            series:[],
            xAxisarr:[]

        }
    },
    created(){
        
    },
    methods: {
          getoption(){
            this.option={
                    // title: {
                    //     text: this.optiontitle,
                    //     left:'center',
                    //     top:20,
                    //     textStyle:{
                    //         color:'#525f86'
                    //     }
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '8%',
                        top: '10%',
                        containLabel:true
                    
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {
                                show: true, 
                                title:'数据视图',
                                // readOnly: false,
                            },
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap:false,
                        data: this.xAxisarr
                    },
                    yAxis: {
                        type: 'value',
                        x:'right',
                    },
                    series: this.series
               }
            },
            getseries(obj){
                var series=[];
                if(Array.isArray(obj)){
                     obj.forEach(item=>{
                     series.push({
                           name: item.name,
                           type: item.type,
                           data: item.data,
                            stack:'总量',
                            barWidth: item.barWidth
                       });
                })
                
                 this.series = series
                 
                }
            },
            getxAxis(arr){
                this.xAxisarr = arr
            }
    }
}
</script>


<style lang='less'>
    .charts{
        width: 100%;
        height: 100%;
        .chart{
            width: 100%;
            height: 100%;
        }
    }

</style>