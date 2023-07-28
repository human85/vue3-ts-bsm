<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

type EChartsOption = echarts.EChartsOption

const chart = ref<HTMLDivElement | null>(null)

const option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    name: '访问量',
    axisLine: {
      show: true
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: true
    }
  },
  grid: {
    top: 50,
    left: 50,
    right: 40,
    bottom: 40
  },
  series: [
    {
      data: [0, 932, 3000, 934, 1290, 50, 1320],
      type: 'line',
      smooth: true,
      areaStyle: {
        color: 'hotpink'
      },
      label: {
        show: true,
        color: '#fff'
      }
    }
  ]
}
onMounted(() => {
  const line = echarts.init(chart.value)
  line.setOption(option)
})
</script>

<template>
  <div>
    <div class="title">
      <h4>未来一周游客量趋势图</h4>
    </div>
    <div class="content">
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  height: 50px;
  padding: 5px;
  background: url(../../images/dataScreen-title.png) no-repeat 5px 30px;

  h4 {
    margin: 0;
    font-weight: 400;
  }
}

.content {
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: calc(100% - 50px);
  }
}
</style>
