<template>
  <q-header
    class="row no-wrap items-center q-pr-sm"
    style="height: 40px">
    <q-space />
    <q-btn
      dense
      flat
      round
      icon="menu"
      @click="emit('toggle:rightDrawer')" />
  </q-header>
</template>
<script setup>
const emit = defineEmits(['toggle:rightDrawer'])
</script>
