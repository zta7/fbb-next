<template>
  <router-view class="non-selectable" />
  <q-input
    ref="konvaInputRef"
    :style="konvaInputStyle" />
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { emitter } from 'boot/mitt'

const konvaInputRef = ref(null)
const konvaInputStyle = ref({
  display: 'none',
})

emitter.on('show:konvaInput', ({ style }) => {
  konvaInputStyle.value = style
})

defineExpose({
  konvaInputRef,
})

</script>
