<template>
  <q-layout
    view="hHh lpR fFf"
    container>
    <LayoutHeader />
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import LayoutHeader from './BlockMainLayout/LayoutHeader'
</script>
