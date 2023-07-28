<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { dayjs } from 'element-plus'
import { onMounted, onUnmounted, ref } from 'vue'

// 跳转首页
const router = useRouter()
function goToHome() {
  router.push('/layout/home')
}

// 获取当前时间
let timer = 0 // 定时器
const time = ref(dayjs().format('YYYY年MM月DD日 HH:mm:ss')) // 当前时间

onMounted(() => {
  timer = setInterval(() => (time.value = dayjs().format('YYYY年MM月DD日 HH:mm:ss')), 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="header">
    <div class="left">
      <span class="left-btn" @click="goToHome">首页</span>
    </div>
    <div class="center">智慧旅游可视化大数据展示平台</div>
    <div class="right">
      <span class="right-btn">统计报告</span>
      <span class="time">当前时间: {{ time }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: start;

  .left {
    flex: 1.5;
    height: 42px;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat center/100% 100%;

    .left-btn {
      float: right;
      width: 135px;
      height: 42px;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat center/100% 100%;
      font-size: 20px;
      text-align: center;
      line-height: 42px;
      color: #1eabde;
      cursor: pointer;
    }
  }
  .center {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 74px;
    background: url(@/views/Screen/images/dataScreen-header-center-bg.png) no-repeat center/100% 100%;
    font-size: 2em;
    color: #1eabde;
  }
  .right {
    flex: 1.5;
    height: 42px;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat center/100% 100%;

    .right-btn {
      float: left;
      width: 135px;
      height: 42px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat center/100% 100%;
      font-size: 20px;
      text-align: center;
      line-height: 42px;
      color: #1eabde;
    }

    .time {
      padding-left: 50px;
      height: 42px;
      line-height: 42px;
      color: #1eabde;
    }
  }
}
</style>
