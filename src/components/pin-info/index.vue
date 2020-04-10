<template>
  <div v-if="pin" class="pin-content">
    <div class="content">
      {{pin.content}}
    </div>
    <div v-if="pin.pictures && pin.pictures.length" class="pictures">
      <div class="image-list" :class="{'col-1':pin.pictures.length === 1, 'col-3': pin.pictures.length > 1}">
        <div class="image" v-for="(item, index) in pin.pictures" :key="index" :style="{backgroundImage: `url(${item})`}">
          <div class="radio-helper" :style="{paddingTop:calPaddingTop(item)}"></div>
        </div>
      </div>
    </div>
    <div v-if="pin.url" class="link-con">
      <link-view :url="pin.url" :url-title="pin.urlTitle" :url-pic="pin.urlPic"></link-view>
    </div>
    <div v-if="pin.topic" class="topic-con">
      <router-link :to="`/topic/${pin.topic.id}`" class="topic">
        {{pin.topic.title}}
      </router-link>
    </div>
  </div>
</template>

<script>
import LinkView from '../link-view'
import { getUrlParams } from '../../util'
export default {
  components: {
    LinkView,
  },
  props: {
    pin: Object
  },
  methods: {
    calPaddingTop(picUrl) {
      let params = getUrlParams(picUrl)
      let w = parseFloat(params['w'])
      let h = parseFloat(params['h'])
      return h / w * 100 + '%'
    }
  }
}
</script>

<style lang="stylus" scoped>
.pin-content
  background #fff
.content
  white-space pre-wrap  
  word-wrap break-word
  font-size 28rem
  margin-bottom 20rem
.pictures
  margin-bottom 20rem
.image-list
  display flex
  flex-wrap wrap
  max-width 100%

  &.col-1
    .image
      width 400rem
  &.col-3
    .image
      margin-right 8rem
      width: calc((100% - 8px)/3)
      max-width: 220rem
.link-con
  margin-bottom 20rem
.topic
  display inline-block
  padding 0 24rem
  border-radius 25rem
  border 1px solid #007fff
  color #007fff
  line-height 44rem
  font-size 26rem
.image
  flex: 0 1 auto
  position: relative
  margin-top: 8rem
  max-width: 100%
  background-position: 50%
  background-repeat: no-repeat
  background-size: cover
  .radio-helper
    padding-top 74%
</style>