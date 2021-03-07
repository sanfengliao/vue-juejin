<template>
  <div class="recommend-nav">
    <ul class="nav-list">
      <li class="nav-list-item">关注</li>
      <li class="nav-list-item">推荐</li>
      <li class="nav-list-item">热榜</li>
      <li class="nav-list-item">后端</li>
      <li class="nav-list-item">前端</li>
      <li class="nav-list-item">Android</li>
      <li class="nav-list-item">iOS</li>
      <li class="nav-list-item">人工智能</li>
      <li class="nav-list-item">开发工具</li>
      <li class="nav-list-item">代码人生</li>
      <li class="nav-list-item">阅读</li>
    </ul>
    <div class="nav-line"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup () {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
.recommend-nav {
  position: relative;
  overflow: auto;
  background-color: @white;
  &::-webkit-scrollbar {
    display: none;
  }
  .nav {
    &-list {
      display: inline-flex;
      padding: 0 50 * @unit;
      &-item {
        flex-shrink: 0;
        margin-right: 110 * @unit;
        padding: 45 * @unit 0;
        color: #929292;
        font-size: 45 * @unit;
        &:last-child {
          margin-right: 0;
        }
        &--active {
          color: #216fd2;
        }
      }
    }
    &-line {
      position: absolute;
      bottom: 0;
      height: 8 * @unit;
      width: 90 * @unit;
      background-color: #216fd2;
      transform: translateX(50 * @unit);
    }
  }
}
</style>