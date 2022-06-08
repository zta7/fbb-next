<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  target: Object,
})
const { target } = toRefs(props)
</script>
<template>
  <q-scroll-area class="full-height">
    {{ target }}
  </q-scroll-area>
</template>
