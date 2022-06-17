<script setup>
import anime from 'animejs'
import { onMounted, ref } from 'vue'

const animation = ref(null)

onMounted(() => {
  animation.value = anime({
    targets: '.container .box',
    translateX: 270,
    // direction: 'alternate',
    autoplay: false,
    easing: 'easeInOutSine',
  })
})

const onClick = () => {
  animation.value.play()
}
</script>
<template>
  <div
    class="container"
    @click="onClick()">
    <div class="box bg-red" />
    <div class="box bg-blue" />
    <div class="box bg-orange" />
  </div>
</template>
<style lang="scss" scoped>
  .container {
    // width: 400px;
    position: relative;
  }
  .box {
    width: 300px;
    position: absolute;
  }
  .box:nth-child(1) {
    left: 0px;
    top: 25px;
    height: 150px;
  }
  .box:nth-child(2) {
    left: 300px;
    height: 200px;
  }
  .box:nth-child(3) {
    left: 600px;
    top: 25px;
    height: 150px;
  }
</style>
