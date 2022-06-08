<template>
  <q-layout view="hHr lpR fFf">
    <q-page-container>
      <LayoutHeader @toggle:right-drawer="rightDrawerOpen = !rightDrawerOpen" />
      <LeftDrawer />
      <RightDrawer v-model="rightDrawerOpen" />
      <q-page
        :style-fn="(offset, height) => { return { height: (height-offset) + 'px' } }">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import LayoutHeader from './MainLayout/LayoutHeader'
import LeftDrawer from './MainLayout/LeftDrawer'
import RightDrawer from './MainLayout/RightDrawer'

const rightDrawerOpen = ref(false)
</script>
