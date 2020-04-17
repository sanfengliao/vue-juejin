<template>
  <div class="search-content">
    <i class="iconfont icon-sousuo"></i>
    <input :value="value" @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange" 
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        class="search-input" type="text" placeholder="搜索文章、用户、标签">
  </div>
</template>

<script>
  export default {
    props: {
      value: String
    },
    methods: {
      handleInput(e) {
        if (this.isComposing) return
        this.$emit('input',e.target.value)
      },
      handleChange(event) {
        this.$emit('change', event.target.value)
      },
      handleBlur(event) {
        this.focused = false
        this.$emit('blur', event)
      },
      handleFocus(event) {
        this.focused = true
        this.$emit('focus', event)
      },
      handleCompositionStart() {
        this.isComposing = true
      },
      handleCompositionUpdate() {
        
        
      },
      handleCompositionEnd(event) {
        if (this.isComposing) {
          this.isComposing = false
          this.handleInput(event)
        }
      },
    }
  }
</script>

<style lang="stylus" scoped>
.search-content
  display flex
  align-items center
  border-radius 5*$unit
  padding 0 10*$unit
  width 100%
  height 60*$unit
  background #3399fe
  .search-input
    display block
    flex 1
    border none
    padding-left 15*$unit
    height 60*$unit
    background transparent
    color white
    outline none
    font-size 25*$unit
    &::placeholder
      color #88ccfb
      font-size 25*$unit
  .iconfont
    flex 0 0 40*$unit
    color #fff
    font-size 35*$unit
</style>