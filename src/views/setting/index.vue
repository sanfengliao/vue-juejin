<template>
  <div class="setting-con">
    <header class="setting-header">
      <s-header title="设置" />
    </header>
    <section class="setting-section">
      <div v-if="$store.state.isLogin" class="contact-infomation">
        <div class="email op-item border-bottom-1px touch-active">
          <span>邮箱</span>
          <span class="value">{{email ? email: '未设置'}}</span>
        </div>
        <div class="phone op-item border-bottom-1px touch-active">
          <span>手机号</span>
          <span class="value">{{phone? phone :'未设置'}}</span>
        </div>
        <router-link to="/set-psd">
          <div class="email op-item border-bottom-1px touch-active">
            <span>修改账户密码</span>
          </div>
        </router-link>
      </div>
      <router-link class="about-link" to="/about">
        <div class="about op-item touch-active">
          <span>关于</span>
        </div>
      </router-link>
      <div @click="logout" v-if="$store.state.isLogin" class="logout touch-active">
        <span>退出登录</span>
      </div>
    </section>
  </div>
</template>

<script>
import SHeader from '../../components/s-header'
export default {
  name: 'settion',
  data() {
    return {
      email: '',
      phone: ''
    }
  },
  components: {
    SHeader
  },
  created() {
    this.init()
  },
  methods: {
    init() {
     let { email, mobilePhoneNumber} = this.$route.params
     this.email = email
     this.phone = mobilePhoneNumber
    },
    logout() {
      this.$store.dispatch('userLogout')
      this.$router.goBack()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.setting-section
  .contact-infomation
    margin-bottom 20rem
  .op-item
    display flex
    justify-content space-between
    padding 20rem 40rem
    font-size 30rem
    background #fff
    .value
      color $gray-text-color
  .about-link
    display block
    margin-bottom 20rem
  .logout
    padding 25rem
    background #fff
    color red
    font-size 34rem
    text-align center
</style>