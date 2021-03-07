<template>
  <div class="recommended">
    <div class="recommended-header">
      <div class="search-input-con">
        <SearchInput />
      </div>
      <div class="label-manage-entry">
        <div class="label-manage-entry__icon iconfont icon-shezhi"></div>
        <div class="label-manage-entry__text">标签</div>
      </div>
    </div>
    <div class="recommended-nav">
      <Nav />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchInput from '../../../../components/search-input/index.vue';
import Nav from './components/nav/index.vue';
export default defineComponent({
  components: {
    SearchInput,
    Nav,
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped lang="less">
.recommended {
  &-header {
    display: flex;
    align-items: center;
    padding: 20 * @unit 50 * @unit;
    background-color: @white;
    .search-input-con {
      flex: 1;
      margin-right: 25 * @unit;
    }
    .label-manage-entry {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      flex-grow: 0;
      color: @secondary-text-color;
      &__icon {
        margin-right: 10 * @unit;
      }
    }
  }
}
</style>