<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  target: Object,
})

const { target: properties } = toRefs(props)

</script>
<template>
  <q-card
    class="absolute-center"
    style="min-width: 260px;max-width: 400px">
    <q-card-section class="text-h6 q-pb-none">
      Properties
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="properties.version"
        stack-label
        label="version" />
      <q-input
        v-model="properties.applicationArea"
        stack-label
        label="ApplicationArea" />
      <q-input
        v-model="properties.describe"
        stack-label
        label="Describe" />
      <q-input
        v-model="properties.comment"
        stack-label
        label="comment"
        type="textarea" />
    </q-card-section>
  </q-card>
</template>
