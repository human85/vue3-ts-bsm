<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

type EChartsOption = echarts.EChartsOption

const chart = ref<HTMLDivElement | null>(null)

const option: EChartsOption = {
  title: {
    text: '今日分布',
    left: '25%',
    top: 'center',
    textStyle: {
      color: 'white'
    }
  },
  tooltip: {
    trigger: 'item'
  },

  legend: {
    orient: 'vertical',
    right: 80,
    top: 'center',
    textStyle: {
      color: '#fff'
    }
  },
  series: [
    {
      name: '年龄分布',
      type: 'pie',
      right: '30%',
      top: '0%',
      height: '100%',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'inside'
      },

      labelLine: {
        show: true
      },
      data: [
        { value: 1048, name: '1岁' },
        { value: 735, name: '2岁' },
        { value: 580, name: '3岁' },
        { value: 484, name: '4岁' }
      ]
    }
  ]
}

onMounted(() => {
  const pie = echarts.init(chart.value)
  pie.setOption(option)
})
</script>

<template>
  <div>
    <div class="title">
      <h4>年龄比例</h4>
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
  .chart {
    margin-top: 10px;
    width: 100%;
    height: 220px;
  }
}
</style>
