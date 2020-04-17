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
  border-radius: 27.5*$unit
  padding 10*$unit 27.5*$unit
  font-size 20*$unit
  text-align center
  background #f3f7fa
}
</style>