<template>
  <div style="set-psd">
    <header class="set-psd-header">
      <s-header title="设置密码"/>
    </header>
    <section class="set-psd-section">
      <div class="psd-con">
        <input class="psd-input" type="password" placeholder="原密码" v-model="oldPsd"> 
      </div>
      <div class="psd-con">
        <input class="psd-input" type="password" placeholder="新密码" v-model="newPsd">
      </div>
      <div class="btn-con">
        <div @click="changePsd" class="btn">确定</div>
      </div>
    </section>
  </div>
</template>

<script>
import SHeader from '../../components/s-header'
import { changePassword } from '../../api/user'
export default {
  components: {
    SHeader
  },
  data() {
    return {
      oldPsd: '',
      newPsd: ''
    }
  },
  methods: {
    async changePsd() {
      let { oldPsd, newPsd } = this
      if (oldPsd === '') {
        this.$message('掘金：请输入原密码')
        return
      }
      if (newPsd === '') {
        this.$message('掘金：请输入新密码')
        return
      }
      if (newPsd === oldPsd) {
        this.$message('掘金：新旧密码相同')
        return
      }
      let data = await changePassword(oldPsd, newPsd)
      if (data.s === 1) {
        this.$message('掘金：修改密码成功')
        this.$router.goBack()
      } else {
        this.$message(`掘金：${data.m}`)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.set-psd-section
  padding 50*$unit 30*$unit
  .psd-con
    margin-bottom 35*$unit
    .psd-input
      padding 20*$unit 0
      width 100%
      background transparent
      font-size 25*$unit
      color #333
      caret-color #0180ff
      border-bottom: 1px solid #333
      &:focus
        border-bottom: 1px solid #0180ff
      &::placeholder
        color #909090
  .btn
    border-radius 5*$unit
    padding 25*$unit 0
    background #0180ff
    font-size 30*$unit
    color #fff
    text-align center
    &:active
      background #0460bd
</style>