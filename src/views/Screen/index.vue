<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from './components/Header/index.vue'
import Tourist from './components/Tourist/index.vue'
import Gender from './components/Gender/index.vue'
import Age from './components/Age/index.vue'
import Map from './components/Map/index.vue'
import Trend from './components/Trend/index.vue'
import Rank from './components/Rank/index.vue'
import Comparison from './components/Comparison/index.vue'
import Statistic from './components/Statistic/index.vue'

// 数据大屏响应式缩放
const scale = ref(1)

window.addEventListener('resize', () => {
  scale.value = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
})

onMounted(() => {
  scale.value = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
})
</script>

<template>
  <div class="container">
    <div class="screen">
      <Header />
      <div class="main">
        <div class="left">
          <Tourist class="tourist" />
          <Gender class="gender" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Trend class="trend" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Comparison class="comparison" />
          <Statistic class="statistic" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') center/cover no-repeat;

  .screen {
    position: fixed;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    width: 1920px;
    height: 1080px;
    scale: v-bind('scale');

    .main {
      display: flex;
      gap: 40px;
      height: 995px;
      color: #fff;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 25px;
        margin-top: -20px;
        padding-left: 50px;
        .tourist {
          flex: 1.3;
          background: url(./images/dataScreen-main-lt.png) no-repeat center/100% 100%;
        }
        .gender {
          flex: 1.1;
          background: url(./images/dataScreen-main-lc.png) no-repeat center/100% 100%;
        }
        .age {
          flex: 1;
          background: url(./images/dataScreen-main-lb.png) no-repeat center/100% 100%;
        }
      }
      .center {
        flex: 2.5;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .map {
          flex: 3;
        }

        .trend {
          flex: 1.2;
          background: url(./images/dataScreen-main-cb.png) no-repeat center/100% 100%;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 25px;
        margin-top: -20px;
        padding-right: 50px;

        .rank {
          flex: 1.3;
          background: url(./images/dataScreen-main-rt.png) no-repeat center/100% 100%;
        }
        .comparison {
          flex: 1.1;
          background: url(./images/dataScreen-main-rc.png) no-repeat center/100% 100%;
        }
        .statistic {
          flex: 1;
          background: url(./images/dataScreen-main-rb.png) no-repeat center/100% 100%;
        }
      }
    }
  }
}
</style>
