<template>
  <div @click="onSwitch" class="switch" :class="{'is-checked': isChecked}" :style="{backgroundColor: isChecked ? activeColor : inactiveColor}">

  </div>
</template>

<script>
  export default {
    props: {
      checked: {
        type: Boolean,
        default: true
      },
      activeColor: {
        type: String,
        default: '#73bbfd'
      },
      inactiveColor: {
        type: String,
        default: '#d1d1d1'
      }
    },
    data() {
      return {
        isChecked: this.checked
      }
    },
    methods: {
      onSwitch() {
        this.isChecked = !this.isChecked,
        this.$emit('change', this.isChecked)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.switch
  margin 0
  display inline-block
  position relative
  width 70rem
  height 30rem
  border 1px solid #dcdfe6
  outline none
  border-radius 15rem
  box-sizing border-box
  background #dcdfe6
  cursor pointer
  transition border-color .3s,background-color .3s
  vertical-align middle
  &::after
    content: ""
    position: absolute
    top: 50%
    left 0
    transform translateY(-50%)
    border-radius: 100%
    transition: all .3s
    width: 40rem
    height: 40rem
    background: #fff
    box-shadow -1rem 1rem 5rem #000
  &.is-checked
    background 
    &::after
      left: 100%;
      transform translate(-50%, -50%)
      margin-left: -20rem;
      background #007fff
</style>