<template>
  <div class="recommended">
    <search-input />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchInput from '../../../../components/search-input/index.vue';
export default defineComponent({
  components: {
    SearchInput,
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped lang="less">
.recommended {
  padding-top: 20 * @unit;
}
</style>