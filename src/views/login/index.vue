<template>
  <div class="login">
    <header class="login-header">
      <i @click="goBack" class="iconfont icon-fanhui1"></i>
    </header>
    <section class="login-section">
      <div class="logo-con">
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/simplify-logo.3e3c253.svg" alt="">
      </div>
      <div class="login-form">
        <div class="border-bottom-1px">
          <input v-model="username" class="input username" type="text" placeholder="手机号/邮箱">
        </div>
        <div>
          <input v-model="password" class="input password" type="password" placeholder="密码">
        </div>
      </div>
      <div class="btn-con">
        <div @click="login" class="login-btn">登录</div>
      </div>
      <div class="operate-text">
        <span class="forget-pass">忘记密码?</span>
        <span>第三方登录</span>
      </div>
    </section>
  </div>
</template>

<script>

import { login } from '../../api/auth'

const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
const telReg = /^1[3456789]\d{9}$/
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    goBack() {
      this.$router.goBack()
    },
    async login() {
      const { username, password } = this
      if (username === '') {
        this.$message('掘金：请填写手机或邮箱')
        return
      }
      if (!emailReg.test(username) && !telReg.test(username)) {
        this.$message('掘金：请输入正确的手机号或邮箱')
        return
      }
      if (this.password === '') {
        // TODO
        this.$message('掘金：输入密码')
        return 
      }
      let loginType
      if (emailReg.test(username)) {
        loginType = 'email'
      } else if (telReg.test(username)) {
        loginType = 'tel'
      }
      let success = await this.$store.dispatch('userLogin',{username, password, loginType})
      if (success) {
        let { from } = this.$route.query
        if (from) {
          this.$router.goBack()
        } else {
          this.$router.replace('/')
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  background #0180ff
  .login-header
    padding 0 40rem
    height 80rem
    line-height 80rem
    color #fff
    font-size 30rem
  .login-section
    position relative
    padding 20rem 35rem
    height 1100rem
    .logo-con
      margin 0 auto
      margin-bottom 40rem
      display flex
      justify-content center
      align-items center
      padding-left 7px
      width 100rem
      height 100rem
      background #fff
      border-radius 20rem
    .login-form
      margin-bottom 20rem
      .border-bottom-1px
        &:after
          background #000
      .input
        padding 30rem 
        height 105rem
        width 100%
        background #fff
        font-size 30rem
        &::placeholder
          color #909090
    .btn-con
      margin-bottom 20rem
      .login-btn
        height 95rem
        line-height 95rem
        background #006cd9
        text-align center
        color #fff
        font-size 30rem
        &:active
          background #0460bd
    .operate-text
      display flex
      justify-content space-between
      color #fff
      font-size 20rem
      .forget-pass
        opacity 0.6
      
</style>