<template>
  <footer class="footer">
    <div class="nav-list">
      <router-link class="nav-list-route-item" to="/recommended">
        <div class="nav-list-item">
          <i class="iconfont icon-home"></i>
          <span class="text">首页</span>
        </div>
      </router-link>
      <router-link class="nav-list-route-item" to="/pins">
        <div class="nav-list-item">
          <i class="iconfont icon-pin1"></i>
          <span class="text">沸点</span>
        </div>
      </router-link>
      <router-link class="nav-list-route-item" to="/search">
        <div class="nav-list-item">
          <i class="iconfont icon-sousuo"></i>
          <span class="text">发现</span>
        </div>
      </router-link>
      <router-link class="nav-list-route-item" to="/books">
        <div class="nav-list-item">
          <i class="iconfont icon-book"></i>
          <span class="text">小册</span>
        </div>
      </router-link>
      <router-link class="nav-list-route-item" to="/me">
        <div class="nav-list-item">
          <i class="iconfont icon-yonghu"></i>
          <span class="text">我</span>
        </div>
      </router-link>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>

<style scoped lang="less">
@unit: 1 * 100 / 1080vw;
.nav-list {
  display: flex;
  background-color: @white;
  &-route-item {
    flex: 1;
  }
  &-item {
    padding: 30 * @unit 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: @secondary-text-color;
    .iconfont {
      font-size: 60 * @unit;
    }
    .text {
      font-size: 25 * @unit;
    }
    &:active {
      background-color: rgba(96, 98, 102, 0.4);
      .iconfont {
        color: @primary-color;
      }
    }
  }
}
.router-link-active .nav-list-item {
  color: @primary-color;
}
</style>