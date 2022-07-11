<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  target: Object,
})
const { target } = toRefs(props)
console.log(target)

const asyncFn1 = () => new Promise((res) => {
  res(1)
})

const asyncFn2 = () => new Promise((res) => {
  res(1)
})

const fn = () => {
  console.log(asyncFn1())
  console.log(asyncFn2())
  setTimeout(() => {
    console.log(4)
  }, 0)
  console.log(3)
}

fn()

</script>
<template>
  <q-scroll-area class="full-height">
    123
  </q-scroll-area>
</template>
