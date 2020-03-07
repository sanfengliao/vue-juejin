<template>
  <span class="tag">
    {{text}}
  </span>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="stylus" scoped>
.tag {
  border-radius: 27.5rem
  padding 10rem 27.5rem
  font-size 16rem
  text-align center
  background #f3f7fa
}
</style>