<template>
    <div class="statistics">
        <div class="top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-col :span="1">
                    <el-form-item> </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="车间设备:" label-width="80px">
                        <el-cascader v-model="value2" :options="devlist" :props="optionProps" @change="caschange" clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="统计:" :label-width="formLabelWidth" prop="selectType">
                        <el-select v-model="formInline.selectType" @change="changesel" placeholder="统计">
                            <el-option v-for="item in censuelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="日期:" :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="value1"
                            type="daterange"
                            @change="timechange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label=""></el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item style="width:100%">
                        <el-button type="add" icon="el-icon-search" @click="seachinfo">搜索</el-button>
                        <el-button type="success" icon="el-icon-refresh-right" @click="resetting">重置</el-button>
                        <el-button type="add" @click="excelexport">EXCEL导出</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </div>

        <div class="bot">
            <div class="optiontit">{{ optiontitle }}</div>
            <v-chart ref="chart" :options="option" :auto-resize="true" class="chart" id="chart" />
        </div>
    </div>
</template>

<script>
import { selectDeviceRunData, deviceTypeList, deviceList, deviceListByType } from 'api/index';
import { export2Excel } from '../../../utils/util.js';
import moment from 'moment';
import Echarts from 'echarts';
export default {
    name: 'statistics',
    components: {},
    data() {
        return {
            value: '',
            value1: [],
            value2: ['1', '1144426692996108301'],
            option: {},
            formLabelWidth: '60px',

            optionProps: {
                // checkStrictly: true,
                value: 'id',
                label: 'title',
                children: 'deviceList'
            },
            formInline: {
                deviceTye: '',
                deviceId: '',

                selectType: 'yield',
                endDate: '',
                beginDate: ''
            },
            censuelist: [
                {
                    value: 'yield',
                    label: '产量'
                },
                {
                    value: 'run',
                    label: '运行状态'
                }
            ],

            devlist: [],
            casarr: ['1', '1144426692996108301'],
            excellist: [], //表格数据
            optiontitle: '开市单轴高精密冲床产量',
            optiontname: '开市单轴高精密冲床',
            ismore: false,
            unit:''
        };
    },
    computed: {},
    mounted() {
        this.unit='单位:件'
        this.getDate();
        this.getselectDeviceRunData();
        this.getdeviceListByType();
        //    this.getdeviceList()
        //    this.getdeviceTypeList()
    },

    methods: {
        getDate() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            let value1 = [start, end];
            this.$set(this.$data, 'value1', value1);
            this.timechange(value1);
        },
        getoption() {
            this.option = {
                title: {
                    text: this.unit,
                    left:40,
                    top:20,
                    textStyle:{
                        color:'#525f86',
                        fontSize:14
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '8%',
                    top: '10%',
                    containLabel: true
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: { show: true, type: ['line', 'bar'] }
                        // restore: {show: true},
                        // saveAsImage: {show: true}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value',
                    x: 'right'
                },
                series: [
                    {
                        name: '',
                        data: [],
                        type: 'line',
                        barWidth: 20,
                        stack: '时长',
                        smooth: true
                    },
                    {
                        name: '开机时长',
                        data: [],
                        type: 'line',
                        barWidth: 20,
                        stack: '时长',
                        smooth: true
                    },
                    {
                        name: '运行时长',
                        data: [],
                        type: 'line',
                        barWidth: 20,
                        stack: '时长',
                        smooth: true
                    }
                ]
            };
        },
        caschange(e) {
            this.casarr = e;
            let obj = {};
            obj = this.devlist.find(item => {
                return item.id === e[0];
            });
            obj.deviceList.map(item => {
                if (item.id === e[1]) {
                    this.optiontname = item.title;
                }
            });
        },
        changesel(val) {},
        init() {
            this.formInline = {
                deviceTye: '',
                deviceId: '',
                selectType: 'yield'
            };
            this.casarr = ['1', '1144426692996108301'];
            this.value2 = ['1', '1144426692996108301'];
            this.ismore = false;
            this.optiontname = '开市单轴高精密冲床';
            this.optiontitle = '开市单轴高精密冲床产量';
            this.unit='单位:件'
            this.getDate();
        },
        seachinfo() {
            if (this.formInline.selectType === 'yield') {
                this.optiontitle = this.optiontname + '产量';
            } else {
                this.optiontitle = this.optiontname + '运行状态';
                this.unit = '单位:小时'
            }

            this.getselectDeviceRunData();
        },
        // 重置
        resetting() {
            this.init();
            this.getselectDeviceRunData();
        },
        //表格导出
        excelexport() {
            if (this.formInline.selectType === 'yield') {
                //选择产量
                let column = [
                    { prop: 'yield', label: '产量' },
                    { prop: 'dateList', label: '日期' }
                ];
                export2Excel(column, this.excellist, '产量统计');
            } else {
                //状态统计
                if (this.ismore) {
                    //多日
                    let excellist = this.excellist[0].deviceRunList;
                    let dateArr = this.excellist[0].deviceRunTimeList;
                    excellist.forEach((item, index) => {
                        item.date = dateArr[index].dateTime;
                    });
                    let column = [
                        { prop: 'date', label: '日期' },
                        { prop: 'offLength', label: '关机时长' },
                        { prop: 'onLength', label: '开机时长' },
                        { prop: 'runLength', label: '运行时长' }
                    ];
                    export2Excel(column, excellist, '运行状态统计');
                } else {
                    let excellist = this.excellist[0].deviceRunList;
                    if (excellist.length > 0) {
                        excellist.forEach(item => {
                            if (item.state === '0') {
                                item.stateText = '关机';
                            } else if (item.state === '1') {
                                item.stateText = '开机';
                            } else if (item.state === '2') {
                                item.stateText = '运行';
                            }
                        });
                        let column = [
                            { prop: 'dateTime', label: '时间' },
                            { prop: 'stateText', label: '运行状态' }
                        ];
                        export2Excel(column, excellist, '运行状态统计');
                    }
                }
            }
        },
        timechange(e) {
            console.log(e);
            this.formInline.beginDate = moment(e[0]).format('YYYY-MM-DD');
            this.formInline.endDate = moment(e[1]).format('YYYY-MM-DD');
            if (this.formInline.beginDate !== this.formInline.endDate) {
                this.ismore = true;
            } else {
                this.ismore = false;
            }
        },
        //获取图表数据
        getselectDeviceRunData() {
            this.formInline.deviceId = '';
            this.formInline.deviceTye = '';
            if (this.casarr.length > 1) {
                let a = this.casarr[1];
                this.formInline.deviceId = a;
            } else if ((this.casarr.length = 1)) {
                let b = this.casarr[0];
                this.formInline.deviceTye = b;
            }
            selectDeviceRunData(this.formInline).then(res => {
                if (res.code === '0') {
                    this.excellist = res.data;
                    var nowtime = [];
                    var num = [];
                    var num1 = [];
                    var num2 = [];
                    // 选择产量
                    if (this.formInline.selectType === 'yield') {
                        res.data.map(item => {
                            nowtime.push(item.dateList);
                            num.push(item.yield.toString());
                        });
                        //渲染图表
                        this.getoption();
                        this.option.xAxis.data = nowtime;
                        this.option.series[0].data = num;
                        this.option.series[0].name = '产量';
                    } else {
                        //选择运行状态
                        // 多日
                        if (this.ismore) {
                            res.data[0].deviceRunTimeList.map(item => {
                                if (item.dateTime.split(' ')[1]) {
                                    nowtime.push(item.dateTime.split(' ')[1]);
                                } else {
                                    nowtime.push(item.dateTime);
                                }
                            });
                            res.data[0].deviceRunList.map(item => {
                                //关机时长
                                num.push(item.offLength.toString());
                                //开机时长
                                num1.push(item.onLength.toString());
                                //运行时长
                                num2.push(item.runLength.toString());
                            });
                            this.getoption();
                            let hour;
                            if (res.data[0].dateList.length > 0) {
                                hour = res.data[0].dateList;
                            } else {
                                // 不传日期时 默认为小时
                                hour = [
                                    '0',
                                    '01',
                                    '02',
                                    '03',
                                    '04',
                                    '05',
                                    '06',
                                    '07',
                                    '08',
                                    '09',
                                    '10',
                                    '11',
                                    '12',
                                    '13',
                                    '14',
                                    '15',
                                    '16',
                                    '17',
                                    '18',
                                    '19',
                                    '20',
                                    '21',
                                    '22',
                                    '23'
                                ];
                            }
                            this.option.xAxis.data = hour;
                            this.option.series[0].name = '关机时长';
                            this.option.series[0].data = this.hanld2(hour, nowtime, num);
                            this.option.series[1].data = this.hanld2(hour, nowtime, num1);
                            this.option.series[2].data = this.hanld2(hour, nowtime, num2);
                        } else {
                            let state = [];
                            let hour = [];
                            res.data[0].deviceRunList.map(item => {
                                state.push(item.state);
                            });
                            res.data[0].deviceRunList.map(item => {
                                hour.push(item.dateTime.split(' ')[1]);
                            });
                            // if (res.data[0].dateList.length > 0) {
                            //     hour = res.data[0].dateList;
                            // } else {
                            //     // 不传日期时 默认为小时
                            //     hour = [
                            //         '0',
                            //         '01',
                            //         '02',
                            //         '03',
                            //         '04',
                            //         '05',
                            //         '06',
                            //         '07',
                            //         '08',
                            //         '09',
                            //         '10',
                            //         '11',
                            //         '12',
                            //         '13',
                            //         '14',
                            //         '15',
                            //         '16',
                            //         '17',
                            //         '18',
                            //         '19',
                            //         '20',
                            //         '21',
                            //         '22',
                            //         '23'
                            //     ];
                            // }
                            this.drawStateChart(hour, state);
                        }
                    }
                }
            });
        },
        // 绘制阶梯状态图（柱状图模拟，无法切换折线/柱状）

        drawStateChart(hour, state) {
            // debugger;
            let myChart = Echarts.init(document.getElementById('chart'));
            // 使用 aidState做填充，fakeState显示小线条
            var aidState = [];
            var fakeState = [];
            let yax = [];
            for (let i = 0; i < state.length; i++) {
                fakeState[i] = state[i] * 0.01;
                aidState[i] = state[i] - fakeState[i];
                yax[i] = 0.01;
            }
            let option1 = {
                title: {
                    show: Object.keys(state).length === 0,
                    extStyle: {
                        color: 'grey',
                        fontSize: 20
                    },
                    text: '暂无数据',
                    left: 'center',
                    top: 'center'
                },
                tooltip: {
                    // trigger: 'axis'
                    show: false
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        }
                    }
                },
                grid: {
                    bottom: '10%',
                    top: '10%',
                    containLabel: false
                },
                xAxis: {
                    type: 'category',
                    data: hour,
                    boundaryGap: true,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        align: 'center'
                    }
                },
                yAxis: {
                    type: 'value',
                    // scale: false,
                    interval: 1,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        margin: 36,
                        align: 'left',
                        formatter: function(value) {
                            let stateMsg = ['关机', '开机', '运行'];
                            return (value = stateMsg[value]);
                        }
                    },
                    splitLine: {
                        interval: 0
                    }
                },
                series: [
                    {
                        name: '辅助',
                        type: 'bar',
                        data: aidState,
                        stack: '设备状态值',
                        barWidth: '100%',
                        itemStyle: {
                            color: 'rgba(0,0,0,0)',
                            barBorderColor: 'rgba(0,0,0,0.2)',
                            borderType: 'dashed'
                        }
                    },
                    {
                        type: 'bar',
                        name: '状态',
                        data: fakeState,
                        stack: '设备状态值',
                        barWidth: '100%',
                        itemStyle: {
                            color: function(params) {
                                // build a color map as your need.
                                var colors = ['#737172', '#0096ff', '#259B24'];
                                return colors[params.value * 100];
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option1, (window.onresize = myChart.resize));
        },
        // 处理图表数据格式
        hanld2(hour, time, data) {
            if (!(Array.isArray(time) && Array.isArray(data) && time.length === data.length)) {
                return;
            }
            let result = [];
            let i = 0;
            hour.map((item, index) => {
                if (time.indexOf(item) === -1) {
                    result.push('0');
                } else {
                    result.push(data[i]);
                    i++;
                }
            });
            return result;
        },
        // 车间设备
        getdeviceListByType() {
            deviceListByType().then(res => {
                if (res.code === '0') {
                    this.devlist = res.data;
                }
            });
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
        initEcharts() {
            let myChart = Echarts.init(this.$refs.chart);
            myChart.setOption(this.option);
        }
    }
};
</script>

<style lang="less">
.statistics {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .top {
        height: 45px;

        .mr10 {
            width: 20%;
        }
        .mr11 {
            margin-left: 4%;
        }
        .mr1 {
            float: right;
        }
        .mr2 {
            width: 25%;
        }
        .el-form-item__content {
            width: calc(100% - 80px);
            float: right;
        }
        .demo-form-inline {
            margin-top: 9px;
        }
    }
    .bot {
        flex: 1;
        position: relative;
        .chart {
            width: 100%;
            height: 100%;
        }
        .optiontit {
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
