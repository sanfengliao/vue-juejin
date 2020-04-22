<template>
  <div class="fold-text">
    <div ref="clip">
      <div class="clip-text text">
        {{text}}
      </div>
    </div>
    <div ref="full">
      <div class="full-text text">
        {{text}}
      </div>
    </div>
    <div v-if="clip && canClip" class="open-text" @click.stop.prevent="open">{{isFold ? '展开全文' : '收起'}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    clip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      canClip: false,
      isFold: false
    }
  },
  created() {

  },
  mounted() {
    this.$clip = this.$refs['clip']
    this.$full = this.$refs['full']
    if (this.clip) {
      this.canClip = this.$full.clientHeight > this.$clip.clientHeight
      this.isFold = this.canClip

    }
    if (this.canClip) {
      this.$full.style.display = 'none'
    } else {
      this.$clip.style.display = 'none'
    }
  },
  methods: {
    open() {
      if (this.isFold) {
        this.$clip.style.display = 'none'
        this.$full.style.display = 'block'
      } else {
        this.$clip.style.display = 'block'
        this.$full.style.display = 'none'
      }
      this.isFold = !this.isFold
      this.$emit('folded', this.isFold)
    }
  }
}
</script>

<style lang="stylus" scoped>
.text
  margin-bottom 10 * $unit
  font-size 28*$unit
.clip-text
  display: -webkit-box
  white-space pre-line  
  word-wrap break-word
  overflow hidden
  text-overflow ellipsis
  -webkit-line-clamp 4
  -webkit-box-orient vertical
.full-text
  white-space pre-line  
  word-wrap break-word

.open-text
  color $primary-color
  font-size 25*$unit

</style>