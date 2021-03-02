<template>
  <div class="search-input">
    <div class="iconfont search-input__icon icon-sousuo"></div>
    <input type="text" class="search-input__input" placeholder="搜索掘金">
    <div class="search-input__del-btn iconfont icon-delete"></div>
  </div>
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
.search-input {
  padding: 25 * @unit 30 * @unit;
  background-color: #efefef;
  height: 95 * @unit;
  display: flex;
  border-radius: 10 * @unit;
  &__icon {
    margin-right: 10 * @unit;
  }
  &__input {
    margin-right: 10 * @unit;
    font-size: 40 * @unit;
    flex: 1;
    caret-color: @primary-color;
    background-color: transparent;
    border: none;
    outline: none;
    &::-webkit-input-placeholder {
      color: #c8c8c8;
    }
  }
  &__del-btn {
    color: #b1afaf;
  }
}
</style>