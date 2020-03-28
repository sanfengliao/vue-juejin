<template>
  <div :style="style" class="loading">
    <i class="iconfont icon-refresh"></i>
  </div>
</template>

<script>
  export default {
    props: {
      size: String
    },
    data() {
      return {
       style: {
         width: this.size,
         height: this.size,
       }
      }
    }
  }
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #f4f5f5;
  animation: rotation .8s linear 0s infinite;
  
}

.loading .iconfont{
  color: #d61515
}
  

@keyframes rotation {
  from {
    transform:rotate(0);
  }
  to {
    transform:rotate(360deg);
  }
}
</style>