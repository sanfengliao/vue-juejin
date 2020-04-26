<template>
  <div class="section-content-con">
    <div v-if="needBuy" class="need-buy">
     
        <div class="poster" :style="{backgroundImage: `url(${book.img})`}">
        </div>
        <div class="title">此章节为付费章节</div>
        <div class="desc">现在购买立即解锁全部内容</div>
        <button class="btn">立即购买 ￥{{book.price}}</button>
    </div>

    <div v-else class="article-content" v-html="contentHtml">

    </div>
  </div>
</template>

<script>
import { getBookSectionDetail } from '@/api/book'
export default {
  props: {
    book: Object
  },
  name: 'section-content',
  data() {
    return {
      contentHtml: '',
      needBuy: false
    }
  },
  created() {
    
    this.init()
  },
  methods: {
    async init() {
      let { sectionId } = this.$route.params
      let data = await getBookSectionDetail(sectionId)
      if (data.s === 1) {
        this.contentHtml = data.d.html
      } else {
        this.needBuy = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.need-buy
  display flex
  align-items center
  justify-content center
  flex-direction column
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background #fff
  z-index 11
  .poster
    position relative
    width 300 * $unit
    height 420 * $unit
    margin-bottom 80*$unit
    background-size cover
    background-position 50%
    background-repeat no-repeat
    border-radius 4*$unit
    &::after
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 86%;
      transform: translateX(-50%);
      height: 100%;
      box-shadow: 0 18px 40px rgba(52,82,110,.5)
  .title
    font-size 36 * $unit
    font-weight bold
    margin-bottom 24 * $unit
  .desc
    margin-bottom 32 * $unit
    color #7d7d7d
    font-size 30*$unit
  .btn
    -webkit-appearance: none;
    appearance: none;
    background-color: #007fff;
    color: #fff;
    border-radius: 2px;
    border: none;
    padding: .5rem 1.3rem;
    outline: none;
    transition: background-color .3s,color .3s;
    cursor: pointer
</style>