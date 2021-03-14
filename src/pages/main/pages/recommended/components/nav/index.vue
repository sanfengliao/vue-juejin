<template>
  <div class="recommend-nav">
    <div class="nav-list-con">
      <ul class="nav-list">
        <li
          v-for="(item, index) in navList" 
          :key="item.categoryId || index"
          class="nav-list-item"
          :class="{
            'nav-list-item--active': index === currentCategoryIndex
          }"
          @click="onNavItemClick(item, index, $event)">
          {{item.name}}
        </li>
      </ul>
      <div class="nav-line" ref="navLine"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { State } from '@/store';
import { NavCategory } from '@/types';
import { computed, defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  setup () {
    const store = useStore<State>();

    const navLine = ref<HTMLDivElement>();
    const computeNavLineStyle = (el: HTMLDivElement) => {
      const width = getComputedStyle(el, null).width;
      const offsetLeft = el.offsetLeft + (el.offsetWidth - parseInt(width)) / 2;
      navLine.value!.style.transform = `translateX(${offsetLeft}px)`;
      navLine.value!.style.width = width;
    }

    const currentCategoryIndex = ref(1);
    const onNavItemClick = (item: NavCategory, index: number, e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      computeNavLineStyle(target);
      currentCategoryIndex.value = index;
    }
    
    onMounted(() => {
      const el = document.querySelector(`.recommend-nav .nav-list-item:nth-child(${currentCategoryIndex.value + 1})`) as HTMLDivElement;
      computeNavLineStyle(el);
    })

    const navList = computed(() => store.state.defaultCateList.concat(store.state.categoryList));

    return {
      navLine,
      onNavItemClick,
      navList,
      currentCategoryIndex,
    }
  },
})
</script>

<style lang="less" scoped>
.recommend-nav {
  overflow: auto;
  background-color: @white;
  &::-webkit-scrollbar {
    display: none;
  }
  .nav {
    &-list-con {
      position: relative;
      flex-direction: column;
    }
    &-list {
      display: flex;
      padding: 0 50 * @unit;
      &-item {
        box-sizing: content-box;
        flex-shrink: 0;
        padding: 45 * @unit 55 * @unit;
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
      transition: transform .5s;
    }
  }
}
</style>