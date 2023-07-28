<script setup lang="ts">
import { useUserStore } from '@/store/userStore'
import { storeToRefs } from 'pinia'
import { getTime } from '@/utils/getTime'

const { userInfo } = storeToRefs(useUserStore())
</script>

<template>
  <div class="home">
    <el-card>
      <div class="content">
        <img :src="userInfo?.avatar" class="avatar" />
        <div class="slogan">
          <h3>{{ getTime() }}{{ userInfo?.name }}</h3>
          <p>硅谷甄选运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="welcome-img">
      <SvgIcon name="welcome" width="600px" height="600px" />
    </div>
  </div>
</template>
<style lang="scss">
.content {
  display: flex;
  gap: 2em;

  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .slogan {
    font-size: 1.7em;

    p {
      font-size: 1em;
      font-style: italic;
      color: skyblue;
    }
  }
}

.welcome-img {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>
