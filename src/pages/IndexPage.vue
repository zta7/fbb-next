<script setup>

import IndexPageLayout from 'layouts/IndexPageLayout'

</script>
<template>
  <index-page-layout>
    <q-page
      :style-fn="(offset, height) => { return { height: (height-offset) + 'px' } }"
      class="row no-wrap">
      <router-view />
    </q-page>
  </index-page-layout>
</template>
