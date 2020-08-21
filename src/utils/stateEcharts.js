export function renderOptions(ary) {
 debugger
    let colorAry = ['#fff','#ccc', '#3f51b5', '#259b24', '#ff9800'];
    
    let arr = rendPoint(ary)
    
    let timeAry = []
    let timeAry1 = [],
      dataAry = [], areaAry = []
    arr.map(item => {
        timeAry1.push(item.time)
        dataAry.push((item.value) * 100)
        areaAry.push(3)
      })
    timeAry = timeAry1
    console.log(areaAry, )
     let options = {
      title: {
        show: false,
        textStyle: {
          color: 'grey',
          fontSize: 20
        },
        text: '暂无数据',
        left: 'center',
        top: 'center'
      },
      tooltip: {
        // trigger: 'axis'
        show: true,
        formatter: function (params) {
            debugger
        //   if (params.componentIndex == 1) {
        //     return ''
        //   }
        //   let indexSearch = arr.findIndex(item => {
        //     return item.time == params.name
        //   })
        //   let val = arr[indexSearch].value
        //   let stateMsg = ['', '关机', '待机', '生产', '故障'];
        //   return '时间:'+toMin(params.name * 1) + '<br/>状态:' + stateMsg[val]
        }
      },
      toolbox: {
        show: false,
        trigger: 'axis'
      },
      grid: {
        bottom: '10%',
        top: '10%',
        left: '6%',
        right: '6%',
        containLabel: false
      },
      
      xAxis: [
        { // 折线图的X轴线
          type: 'category',
          data: timeAry1,
          position: 'bottom',
          show: true,
          axisLabel: {
            interval: 239,
            formatter: function (value) {
              // 格式化成月/日，只在第一个刻度显示年份
              // console.log(value)
              let time = toMin(value)
              return time
            }
          },
          boundaryGap: false
        }
      ],
      yAxis:
  
      {
        type: 'value',
        nameTextStyle: 'g',
        interval: 100,
        axisLabel: {
          show: true,
          margin: 36,
          align: 'left',
          formatter: function (value) {
            // console.log(value, 'value')
            let stateMsg = ['状态','关机', '待机', '生产',];
            return (value = stateMsg[value / 100]);
          }
        }
      },
       series: [
         {
          type: 'line',
          data: '',
        },
        {
          name: '辅助',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          },
          emphasis: {
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: dataAry
        },
        {
          name: '收入',
          type: 'bar',
          stack: '总量',
          barWidth: '100%',
          width: '100%',
          itemStyle: {
            color: function (params) {
              var colors = colorAry;
              let indexSearch = timeAry.indexOf(params.name * 1)
              // console.log(dataAry[indexSearch], '--')
              return colors[dataAry[indexSearch] / 100];
            }
          },
          data: areaAry
        },
        {
          name: 'Step Start',
          type: 'line',
          step: 'middle',
          symbol: 'rect',
          symbolSize: 1, //折线点的大小
          lineStyle: {
            type: 'dotted',
            color: '#ccc'
  
          },
          data: dataAry
        },
      ]
    }
    return options
  }
  
  function toSecond(time) {
    let targetTime = time.split(':')
    return targetTime[0] * 60 + targetTime[1]*1
  }
  function toMin(time) {
    let min = Math.floor(time / 60)
    let hour = time % 60
    min = min >= 10 ? min : '0' + min
    hour = hour >= 10 ? hour : '0' + hour
    return min + ':' + hour
  }
  function getDateArray(startDate,endDate) {
    var dateArray = [];
    for (let i = startDate; i < endDate; i++) {
      dateArray.push(i)
    }
    return dateArray
  }
  let arr1 = [{
    time: '00:00',
    value: 1
  }, {
    time: '00:17',
    value: 2
  }, {
    time: '01:23',
    value: 3
    },
    {
    time: '03:53',
    value: 1
    },
    {
    time: '03:59',
    value: 2
  }, {
    time: '08:15',
    value: 3
    }, {
      time: '18:15',
      value: 2
    }, {
      time: '23:59',
      value: 4
    }
  ]
  
  // let arr1 = ary
  
  function rendPoint(ary) {
    let arr1 = []
    ary.map(item => {
      arr1.push({
        time: item.time.slice(11, 16),
        value: item.value
      })
    })
    let arr2 = getDateArray(0, 1440, 1)
    let num = 0
  
    // console.log(arr2, arr1)
    arr2.map((item, index) => {
      let obj = arr1.filter(v => toSecond(v.time) === item)
      if (obj.length > 0) {
        num = obj[0].value
        arr2[index] = {
          time: toSecond(obj[0].time),
          value: num
        }
      } else if (item <= toSecond(arr1[arr1.length - 1].time)) {
        arr2[index] = {
          time: item,
          value: num
        }
      } else {
        arr2[index] = {
          time: item,
          value: 0
        }
      }
    })
    
    return arr2
  }