<template>
  <div class="feedback-con">
    <header class="feedback-header">
      <s-header title="关于"/>
    </header>
    <section class="feedback-section">
      <div class='item'>
        <div class='title'>给 掘金 官方反馈</div>
        <div class="desc">
          请使用 掘金 官方渠道（APP、网站等）进行反馈。<br>
          该Web应用完全为第三方开发者开发，仅用于学习交流，禁止用于其他用途。
        </div>
      </div>
      <div class='item'>
        <div class='title'>代码已开源</div>
        <div class="xx-desc">
          <div class="iconfont-con">
            <i class="iconfont icon-git"></i>
          </div>
          <div class="text">
            <div class="desc">求大佬给个star</div>
            <div class="address">{{githubAddress}}</div>
          </div>
        </div>
      </div>

      <div class='item'>
        <div class='title'>联系方式</div>
        <div class="xx-desc">
          <div class="iconfont-con">
            <i class="iconfont icon-git"></i>
          </div>
          <div class="text">
            <div class="desc">通过GitHub反馈</div>
            <div class="address">{{githubHome}}</div>
          </div>
        </div>
        <div class="xx-desc">
          <div class="iconfont-con">
            <i class="iconfont icon-emailFilled"></i>
          </div>
          <div class="text">
            <div class="desc">通过Email反馈</div>
            <div class="address">{{email}}</div>
          </div>
        </div>
        <div class="xx-desc">
          <div class="iconfont-con">
            <i class="iconfont icon-qq"></i>
          </div>
          <div class="text">
            <div class="desc">通过QQ反馈</div>
            <div class="address">{{qq}}</div>
          </div>
        </div>
      </div>
    </section>
    <footer class="feedback-footer">卑微开发者·sanfengliao</footer>
  </div>
</template>

<script>
import SHeader from '../../components/s-header'
export default {
  components: {
    SHeader
  },
  data() {
    return {
      githubAddress: 'https://github.com/sanfengliao/vue-juejin',
      email: '1164406557@qq.com',
      qq: '1164406557',
      githubHome: 'https://github.com/sanfengliao'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/variable.styl"
.feedback-section
  color #333
  .item
    margin-bottom 20rem
    padding 30rem 35rem 20rem
    background #fff
    .title
      font-size 34rem
      color $primary-text-color
      margin-bottom 20rem
    >.desc
      line-height 50rem
      font-size 28rem
  .xx-desc
    display flex
    padding 20rem 0
    .iconfont-con
      margin-right 20rem
    .iconfont
      font-size 28rem
    .desc
      font-size 30rem
      margin-bottom 20rem
    .address
      font-size 25rem
.feedback-footer
  position absolute
  width 100%
  bottom 20rem
  font-size 25rem
  text-align center
</style>