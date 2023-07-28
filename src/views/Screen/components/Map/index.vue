<script lang="ts" setup>
import chinaJson from './china.json'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

type EChartsOption = echarts.EChartsOption

const chart = ref<HTMLDivElement | null>(null)
echarts.registerMap('CHINA', chinaJson as any)

const option: EChartsOption = {
  title: {
    text: '实时地图'
  },
  geo: {
    map: 'CHINA',
    roam: true,
    zoom: 1.5,
    top: 200,
    label: {
      show: true
    }
  },
  series: [
    {
      type: 'lines',
      polyline: true,
      data: [
        {
          coords: [
            [116.405285, 39.904989], // 起点
            [111.02661, 33.478386] // 终点
          ],

          // 统一的样式设置
          lineStyle: {
            width: 2
          }
        }
      ],
      effect: {
        show: true,
        symbolSize: 4,
        symbol: 'arrow'
      }
    }
  ]
}
onMounted(() => {
  const map = echarts.init(chart.value)
  map.setOption(option)
})
</script>

<template>
  <div ref="chart"></div>
</template>

<style lang="scss" scoped></style>
