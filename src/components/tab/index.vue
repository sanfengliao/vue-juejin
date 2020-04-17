<template>
  <div class="top tabs">
    <div ref="inner" class="inner">
      <div @click="onTabClick(item, i)" class="tab" :class="{active: currentIndex === i}" v-for="(item, i) in tabs" :key="item">{{item}}</div>
    </div>
    <div class="bar" :style="{left: `${currentIndex * tabWidth}px`}"></div>
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
      tabWidth: 0
    }
  },
  mounted() {
    this.tabWidth = this.$refs['inner'].clientWidth / this.tabs.length
  },
  methods: {
    onTabClick(item, i) {
      this.$emit('onItemClick', item, i)
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80*$unit;
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
  width: 50%;
  height: 5*$unit;
  background: #fff;
  transition: 250ms ease-out;
}
</style>