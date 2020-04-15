<template>
  <div class="fold-text">
    {{text}}
  </div>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="stylus" scoped>
.fold-text
  display: -webkit-box
  white-space pre-line  
  word-wrap break-word
  overflow hidden
  text-overflow ellipsis
  -webkit-line-clamp 4
  -webkit-box-orient vertical

</style>