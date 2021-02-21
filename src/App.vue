<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style lang="less">
@unit: 1 * 100 / 1080vw;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
html, body, #app {
  width: 100%;
  height: 100%;
}
</style>