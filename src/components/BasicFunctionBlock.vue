<script setup>
import {
  ref, inject,
} from 'vue'
import BlockTree from './block/BlockTree'

const tree = inject('tree')

const splitterModel = ref(250)
</script>
<template>
  <q-splitter
    v-model="splitterModel"
    reverse
    unit="px"
    :limits="[200, 400]"
    style="height: 100%">
    <template #before>
      <router-view
        id="main"
        class="fit" />
    </template>
    <template #after>
      <q-scroll-area class="fit">
        <block-tree
          :tree="tree" />
      </q-scroll-area>
    </template>
  </q-splitter>
</template>
