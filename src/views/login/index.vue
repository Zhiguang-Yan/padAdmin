<template>
  <div class="container">
    <div class="loginBox">
      <h2>login</h2>
      <el-form
        :rules="rules"
        ref="loginRef"
        :model="loginForm"
        class="pad-form"
        size="large"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            class="pad-input"
            placeholder="useName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            class="pad-input"
            v-model="loginForm.password"
            @keyup.enter="submitForm(loginRef)"
            placeholder="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="submit-container">
        <pad-btn class="btn" @click="submitForm(loginRef)">登陆</pad-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ILoginForm } from './type'
import { reactive, ref, watch } from 'vue'
// @ts-ignore
import type { FormInstance } from 'element-plus'
import { useRoute, useRouter, LocationQueryRaw } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
const rules = {
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
}
const loginForm = reactive<ILoginForm>({
  username: null,
  password: null,
})
const loginRef = ref<FormInstance>()
const useStore = useUserStore()
const redirect = ref<string>()
const otherQuery = ref<LocationQueryRaw>()
const router = useRouter()
const route = useRoute()
watch(
  () => route,
  (newValue) => {
    const query = newValue.query
    if (query) {
      redirect.value = query.redirect as string
      otherQuery.value = getOtherQuery(query)
    }
  },
  {
    immediate: true,
  }
)
// 获取其他参数
function getOtherQuery(query: object) {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      // @ts-ignore
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

// 提交表单
const submitForm = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate((valid: boolean) => {
    if (!valid) return
    useStore.login(loginForm).then((res) => {
      if (res) {
        router.push({
          path: redirect.value || '/',
          query: otherQuery.value,
        })
      }
    })
  })
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  background: linear-gradient(#141e30, #243b55);
  overflow: hidden;
}
.loginBox {
  width: 600px;
  height: auto;
  background-color: #0c1622;
  margin: 100px auto;
  border-radius: 10px;
  box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.6);
  padding: 40px;
  box-sizing: border-box;
}
h2 {
  text-align: center;
  color: aliceblue;
  margin-bottom: 30px;
  font-family: 'Courier New', Courier, monospace;
}
.pad-form {
  .el-form-item {
    margin-bottom: 40px;
  }
}
.submit-container {
  text-align: center;
  margin-top: 50px;
}
.btn {
  width: 200px;
  background: #03e8f41c;
}
</style>

<style lang="scss">
.pad-input i.el-input__icon {
  &:hover {
    color: #03e9f4;
  }
  color: #03e9f4;
}

.pad-input input.el-input__inner {
  font-size: 16px;
  background: transparent;
  border: transparent;
  border-bottom: 1px solid #03e9f4;
  border-radius: 0;
  color: #fff;
  &::placeholder {
    color: #03e9f4;
    transition: all 0.2s linear;
    font-size: 20px;
  }

  &:focus {
    &::placeholder {
      font-size: 12px;
    }
  }
}
</style>