<template>
  <div class="statistics">
       <div class="top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">

            <el-form-item label="车间设备:" class="handle-select mr10 mr11" label-width="80px" >
                    <el-cascader
                        v-model="value2"
                        :options="devlist"
                        :props="optionProps"
                        @change='caschange'
                        clearable>
                    </el-cascader>
             </el-form-item>
            
             <el-form-item label="统计:" class="handle-select mr10" :label-width="formLabelWidth" prop='selectType'>
                 <el-select v-model="formInline.selectType"  placeholder="统计" >
                     <el-option
                        v-for="item in censuelist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
             </el-form-item>
             <el-form-item label="日期:" class="handle-select mr10" :label-width="formLabelWidth">
                 <el-date-picker
                    v-model="value1"
                    type="daterange"
                    @change='timechange'
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
             </el-form-item>
            
              <el-form-item class="handle-select mr1">
                  <el-button type="success" icon="el-icon-refresh-right" @click="resetting">重置</el-button>
              </el-form-item>
                <el-form-item class="handle-select mr1">
                  <el-button type="add" icon="el-icon-search" @click="seachinfo">搜索</el-button>
              </el-form-item>
             </el-form>
          </div>
         
          <div class="bot"> 
              <div class="optiontit">{{optiontitle}}</div>
                <v-chart ref='chart' :options="option" :auto-resize="true" class="chart"/>
          </div>
  </div>
</template>

<script>
import {selectDeviceRunData,deviceTypeList,deviceList,deviceListByType} from 'api/index'
import moment from 'moment'
export default {
    name: 'statistics',
    components:{
      
    },
    data() {
        return {
            value:'',
            value1:'',
            value2:[],
            option : {},
            formLabelWidth:'60px',
          
            optionProps: {
                // checkStrictly: true,
                value: 'id',
                label: 'title',
                children: 'deviceList'
            },
            formInline:{
                deviceTye:'',
                deviceId:'',
              
                selectType:'yield',
                endDate:'',
                beginDate:'',
            },
            censuelist:[{
                value: 'yield',
                label: '产量'
                }, {
                value: 'run',
                label: '运行状态'
                }
            ],
           
            devlist:[],
            casarr:[],
            optiontitle:'设备产量',
            optionname:''
        }
    },
    computed:{
         
    },
    mounted(){
       this.getselectDeviceRunData()
       this.getdeviceListByType()
    //    this.getdeviceList()
    //    this.getdeviceTypeList()
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
                        //     dataView: {
                        //         show: true, 
                        //         title:'数据视图',
                        //         lang: ['数据视图', '关闭', '导出Excel'],
                        //          contentToOption: function (opts) {
                        //              debugger
                        //             $("#tableExcel_Day").table2excel({
                        //                 exclude: ".noExl", //过滤位置的 css 类名
                        //                 filename: '每日价格走势图' + ".xls", //文件名称
                        //                 name: "Excel Document Name.xls",
                        //                 exclude_img: true,
                        //                 exclude_links: true,
                        //                 exclude_inputs: true
                        //             });
                        //         },
                        //         optionToContent: function (opt) {
                        //             let axisData = opt.xAxis[0].data; //坐标数据
                        //             let series = opt.series; //折线图数据
                        //             let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
                        //             let tdBodys = ''; //数据
                        //             series.forEach(function (item) {
                        //                 //组装表头
                        //                 tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
                        //             });
                        //             let table = `<table id="tableExcel_Day" border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`;
                        //             for (let i = 0, l = axisData.length; i < l; i++) {
                        //                 for (let j = 0; j < series.length; j++) {
                        //                     //组装表数据

                        //                     tdBodys += `<td>${ series[j].data[i]}</td>`;
                        //                 }
                        //                 table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
                        //                 tdBodys = '';
                        //             }
                        //             table += '</tbody></table>';
                        //             return table;
                        //         }

                        //     },
                            magicType: {show: true, type: ['line', 'bar']},
                            // restore: {show: true},
                            // saveAsImage: {show: true}
                        }
                    },
                    xAxis: {
                            type: 'category',
                            boundaryGap:false,
                            data: []
                        },
                        yAxis: {
                            type: 'value',
                            x:'right',
                        },
                        series: [{
                            name:'',
                            data: [],
                            type: 'line',
                            barWidth: 20,
                            stack:'时长',
                            smooth: true
                        },{
                            name:'开机时长',
                            data: [],
                            type: 'line',
                            barWidth: 20,
                            stack:'时长',
                            smooth: true
                        },{
                            name:'运行时长',
                            data: [],
                            type: 'line',
                            barWidth: 20,
                            stack:'时长',
                            smooth: true
                        }]
            }
       },
       caschange(e){
            this.casarr = e
           
            let obj = {};
            obj = this.devlist.find((item)=>{  
                    return item.id === e[0];  
            });
            obj.deviceList.map(item=>{
                if(item.id === e[1]){
                    this.optiontname = item.title
                }
            })
       },
       
       init(){
           this.formInline ={
                deviceTye:'',
                deviceId:'',
                selectType:'yield',
                endDate:'',
                beginDate:'',}
            this.casarr = []
            this.value2  = []
            this.optiontname = ''
            this.optiontitle = ''
       },
       seachinfo(){
           if(this.formInline.selectType === 'yield'){
               this.optiontitle =this.optiontname + '产量'
           }else{
               this.optiontitle =this.optiontname + '运行状态'
           }
           
           this.getselectDeviceRunData()
       },
       // 重置
       resetting(){
           this.init()
           this.getselectDeviceRunData()
       },
       timechange(e){
           this.formInline.beginDate = moment(e[0]).format('YYYY-MM-DD')
           this.formInline.endDate = moment(e[1]).format('YYYY-MM-DD')
       },
       //获取图表数据
       getselectDeviceRunData(){
          this.formInline.deviceId = ''
          this.formInline.deviceTye= ''
          if(this.casarr.length>1){
              let a = this.casarr[1]
              this.formInline.deviceId = a
          }else if(this.casarr.length = 1){
              let b = this.casarr[0]
              this.formInline.deviceTye = b
          }
           selectDeviceRunData(this.formInline).then(res=>{
               if(res.code==='0'){
                   var nowtime = []
                   var num = []
                   var num1 = []
                   var num2 = []
                   // 选择产量
                   if(this.formInline.selectType === 'yield'){
                       res.data.map(item=>{
                            nowtime.push(item.dateList)
                            num.push(item.yield.toString())
                        })
                        //渲染图表
                        this.getoption()
                        this.option.xAxis.data = nowtime;
                        this.option.series[0].data = num;
                        this.option.series[0].name = '产量';
                   }else{
                       //选择运行状态
                       res.data[0].deviceRunTimeList.map(item=>{
                           if(item.dateTime.split(' ')[1]){
                               nowtime.push(item.dateTime.split(' ')[1])
                           }else{
                               nowtime.push(item.dateTime)
                           }
                       })
                       res.data[0].deviceRunList.map(item=>{
                           //关机时长
                           num.push(item.offLength.toString())
                           //开机时长
                           num1.push(item.onLength.toString())
                           //运行时长
                           num2.push(item.runLength.toString())
                       })
                        this.getoption()
                        var hour;
                        if(res.data[0].dateList.length>0){
                             hour = res.data[0].dateList
                        }else{
                            // 不传日期时 默认为小时
                             hour = ['0', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
                        }
                        this.option.xAxis.data =  hour ;
                        this.option.series[0].name = '关机时长';
                        this.option.series[0].data = this.hanld2(hour ,nowtime,num);
                        this.option.series[1].data =this.hanld2(hour ,nowtime,num1);
                        this.option.series[2].data =this.hanld2(hour ,nowtime,num2);
                   }
               }
           })
       },
       // 处理图表数据格式
       hanld2(hour ,time, data){
           if(!(Array.isArray(time) && Array.isArray(data) && time.length === data.length)){
                return
           }
           let result = [];
           let i = 0;
           hour.map((item, index) => {
                if(time.indexOf(item) === -1){
                    result.push('0');
                }else{
                    result.push(data[i]);
                    i++;
                }
           })
           return result;
       },
        // 车间设备
        getdeviceListByType(){
            deviceListByType().then(res=>{
                if(res.code==='0'){
                    this.devlist = res.data
                }
            })
        },
        // 获取设备列表
        // getdeviceList(){
        //     deviceList().then(res=>{
        //         if(res.code === '0'){
        //             this.deviceList = res.data
        //         }
        //     })
        // },
        // // 获取车间列表
        // getdeviceTypeList(){
        //     deviceTypeList().then(res=>{
        //         this.deviceTypeList = res.data
        //     })
        // },
        initEcharts(){
                let  myChart = Echarts.init(this.$refs.chart);
                myChart.setOption(this.option);
        }
    }
}
</script>


<style lang='less'>
    .statistics{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
         .top{
                height: 45px;
          
                .mr10{
                  width: 20%;
                  
                }
                .mr11{
                    margin-left: 4%;
                }
                .mr1{
                    float: right;
                }
                .el-form-item__content{
                    width: calc(100% - 80px);
                }
                .demo-form-inline{
                    margin-top: 9px;
                }
            }
            .bot{
                flex:1;
                position: relative;
                .chart{
                    width: 100%;
                    height: 100%;
                }
                .optiontit{
                    text-align: center;
                    color: #525f86;
                    width: 100%;
                    position: absolute;
                    left: 0;
                    top: 2%;
                    font-weight: 600;
                    font-size: 16px;
                }
            }
          
            // .page{
            //     margin: 10px 0;
            //     float: right;
            // }
            // .el-pager li.active{
            //     background-color: #409baF !important;
            //     color: #fff;
            // }
    }
</style>
