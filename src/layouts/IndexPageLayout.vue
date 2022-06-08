<template>
  <q-layout
    view="hHh lpR fFf"
    container>
    <LeftDrawer />
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LeftDrawer from './IndexPageLayout/LeftDrawer'
</script>
