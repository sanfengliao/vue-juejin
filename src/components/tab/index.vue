<template>
  <div class="top tabs">
    <div ref="inner" class="inner">
      <div ref="tabs" @click="onTabClick(item, i, $event)" class="tab" :class="{active: currentIndex === i}" v-for="(item, i) in tabs" :key="item">{{item}}</div>
    </div>
    <div class="bar" :style="{left: `${tabLeft}px`, width: `${tabWidth}px`}"></div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array,
    currentIndex: {
      type: Number,
      default: 0
    },
    
  },
  data() {
    return {
      tabWidth: 0,
      tabLeft: 0
    }
  },
  mounted() {
    this.tabWidth = this.$refs['tabs'][0] && this.$refs['tabs'][0].clientWidth
  },
  methods: {
    onTabClick(item, i, e) {
      console.log(e)
      this.$emit('onItemClick', item, i)
      this.tabWidth = e.currentTarget.clientWidth
      this.tabLeft = e.currentTarget.offsetLeft
    }
  }
}
</script>

<style lang="stylus" scoped>
/* 滑动切换 tab 样式 */
.top.tabs {
  position: relative;
}
.top.tabs .inner {
  display: flex;
  align-items: center;
  background: #0180ff;
  color: #fff;
}
.top.tabs .tab {
  font-size: 30 * $unit;
  padding: 20 * $unit 30 * $unit;
  color: #ccc;
  transition: 250ms ease-out;
}
.top.tabs .tab.active {
  transition: 250ms ease-out;
  color: #fff;
}
.top.tabs .bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5*$unit;
  background: #fff;
  transition: 250ms ease-out;
}
</style>