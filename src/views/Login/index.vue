<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/getTime'
import type { FormInstance, FormRules } from 'element-plus'

// 用户信息
const userInfo = reactive({ username: 'admin', password: 'atguigu123' })
const userStore = useUserStore()
const router = useRouter()
const isLoading = ref(false)
const route = useRoute()
// 表单校验规则
const formRef = ref<FormInstance | null>(null)
const rules = reactive<FormRules<typeof userInfo>>({
  username: [{ required: true, min: 3, max: 10, message: '账号长度应为3-10位', trigger: 'blur' }],
  password: [{ required: true, min: 3, max: 10, message: '密码长度应为3-10位', trigger: 'blur' }]
})

// 点击登录
async function login() {
  // 登陆前对所有表单项进行一次验证
  await (formRef.value as FormInstance).validate()
  isLoading.value = true
  try {
    await userStore.login(userInfo)
    ElNotification({
      title: 'Hi!' + getTime(),
      message: '欢迎回来',
      type: 'success'
    })
    // 登录跳转
    router.push((route.query.redirect as string) || '/')
  } catch (err) {
    ElNotification({
      message: err as string,
      type: 'error'
    })
  }
  isLoading.value = false
}
</script>

<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form status-icon class="login-form" :model="userInfo" :rules="rules" ref="formRef">
          <h1>Hello</h1>
          <h2>欢迎来到天空之城拉普达</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model.trim="userInfo.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model.trim="userInfo.password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" :loading="isLoading" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat center/cover;
  color: white;

  .login-form {
    margin-top: 30vh;
    margin-left: 10vw;
    padding: 50px;
    width: 50%;
    background: url('@/assets/images/login_form.png') no-repeat center/cover;

    h1 {
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
@/store/user
