<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

type EChartsOption = echarts.EChartsOption

const chart = ref<HTMLDivElement | null>(null)

const option: EChartsOption = {
  grid: {
    left: 0,
    right: 0
  },
  xAxis: {
    show: false,
    type: 'value',
    min: 0,
    max: 100
  },
  yAxis: {
    show: false,
    type: 'category'
  },
  series: [
    {
      name: '男士',
      type: 'bar',
      data: [30],
      stack: 'gender',
      barWidth: 30,
      label: {
        show: true,
        formatter: params => {
          return `${params.seriesName} ${params.value}%`
        },
        color: '#fff'
      },
      itemStyle: {
        borderRadius: [15, 0, 0, 15],
        color: '#007afe'
      }
    },
    {
      name: '女士',
      type: 'bar',
      data: [70],
      stack: 'gender',
      label: {
        show: true,
        formatter: params => {
          return `${params.seriesName} ${params.value}%`
        },
        color: '#fff'
      },
      itemStyle: {
        borderRadius: [0, 15, 15, 0],
        color: '#ff4b7a'
      }
    }
  ]
}

onMounted(() => {
  const bar = echarts.init(chart.value)
  bar.setOption(option)
})
</script>

<template>
  <div>
    <div class="title">
      <h4>男女比例</h4>
    </div>
    <div class="content">
      <div class="avatars">
        <div class="avatar man">
          <span>男士</span>
          <img src="../../images/man.png" alt="男士头像" />
        </div>
        <div class="avatar woman">
          <span>女士</span>
          <img src="../../images/woman.png" alt="女士头像" />
        </div>
      </div>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 60px;
  width: 100%;
  .avatars {
    display: flex;
    justify-content: space-between;

    .avatar {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      width: 111px;
      height: 116px;
    }
    .man {
      background: url(../../images/man-bg.png) no-repeat center/100% 100%;
    }

    .woman {
      background: url(../../images/woman-bg.png) no-repeat center/100% 100%;
    }
  }
  .chart {
    margin-top: 30px;
    width: 100%;
    height: 40px;
  }
}
</style>
