$(function() {
  // 基于准备好的dom，初始化echarts实例
  var echarts_left = echarts.init(document.querySelector('.echarts_left'))

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['销量', '人数']
    },

    xAxis: {
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      },
      {
        name: '人数',
        type: 'bar',
        data: [150, 204, 326, 103, 102, 201]
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option1)

  var echarts_right = echarts.init(document.querySelector('.echarts_right'))

  // 指定图表的配置项和数据
  var option2 = {
    title: {
      text: '热门品牌销售',
      subtext: '2018年12月',
      x: 'center',
      textStyle: {
        fontSize: 30,
        color: 'red'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接', '邮件', '联盟', '视频', '搜索']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接' },
          { value: 310, name: '邮件' },
          { value: 234, name: '联盟' },
          { value: 135, name: '视频' },
          { value: 1548, name: '搜索' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  echarts_right.setOption(option2)
})
