<template>
  <div class="book-entry-con">
    <div v-if="book" class="book-content">
      <div class="left">
        <div class="poster" :style="{backgroundImage: `url(${book.img})`}"></div>
      </div>
      <div class="center">
        <div class="book-info">
          <div class="title">{{book.title}}</div>
          <div class="author">
            <span class="name">{{book.userData.username}}</span>
            <img class="level" v-if="book.userData.level" :src="book.userData.level | levelImage" alt="">
          </div>
          <div class="other">
            <span>{{book.lastSectionCount}}小节 · {{book.buyCount}}人已购买</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div v-if="!book.isBuy" class="price">￥{{book.price}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
.book-entry-con
  height 220*$unit
  background #fff
  padding 20*$unit
.book-content
  display flex
  align-items center
  .left
    margin-right 20*$unit
    flex 0 0 104*$unit
    height 144*$unit
    box-shadow: 3px 4px 12px 0 rgba(0,0,0,.2)
    overflow: hidden
    background-color: #ccc
    .poster
      height 100%
      width 100%
      background-size cover
      background-position 50%
      background-repeat no-repeat
  .center
    flex 1
    width 0
    margin-right 20*$unit
  .right
    flex 0 0 160*$unit
    height 60*$unit
    .price
      padding-left 30*$unit
      padding-right 30*$unit
      border-radius 30*$unit
      height 60*$unit
      line-height 60*$unit
      background-color #f0f7ff
      font-size 28*$unit
      font-weight 500
      text-align center
      color #07f
.book-info
  white-space normal
  .title
    margin-bottom 20*$unit
    font-size 28*$unit
    color #000
    font-weight 700
  .author
    display flex
    align-items center
    margin-bottom 20*$unit
    height 28*$unit
    font-size 25*$unit
    .level
      margin-left 5*$unit
      height 25*$unit
  .other
    font-size 25*$unit
    color #909090
</style>