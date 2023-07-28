<script lang="ts" setup>
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { onMounted, ref } from 'vue'

const headcount = ref('216908人') // 游客人数

const chart = ref<HTMLDivElement | null>(null)
// 挂载完毕后绘制 确保以获取 dom 元素

onMounted(() => {
  const liquidfill = echarts.init(chart.value)

  // 绘制图表
  liquidfill.setOption({
    series: [
      {
        type: 'liquidFill',
        data: [0.6, 0.55, 0.4, 0.25],
        radius: '100%',
        outline: {
          show: false
        },
        backgroundStyle: {
          borderColor: '#156ACF',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowBlur: 20
        },
        shape:
          'path://M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z',
        label: {
          position: ['38%', '40%'],
          formatter: function () {
            return '预售量\n\n60%'
          },
          fontSize: 30,
          color: '#D94854'
        }
      }
    ]
  })
})
</script>

<template>
  <div>
    <div class="title">
      <h4>实时游客统计</h4>
      <div class="total">可预约总量 <span>99999</span> 人</div>
    </div>
    <div class="content">
      <div class="headcount">
        <span v-for="(item, index) in headcount" :key="index">{{ item }}</span>
      </div>
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background: url(../../images/dataScreen-title.png) no-repeat 5px 30px;

  h4 {
    margin: 0;
    font-weight: 400;
  }

  .total {
    align-self: end;
    font-size: 14px;

    span {
      color: orange;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
  .headcount {
    display: flex;
    justify-content: center;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 55px;
      background: url(../../images/total.png) no-repeat center/100% 100%;
      color: aqua;
      font-size: 1.8em;
    }
  }

  .chart {
    padding-top: 25px;
    width: 100%;
    height: 200px;
  }
}
</style>
