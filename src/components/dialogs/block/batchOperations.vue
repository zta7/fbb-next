<script setup>

const operations = [
  {
    key: 'edit',
    icon: 'edit',
  },
  {
    key: 'save',
    icon: 'save',
  },
  {
    key: 'download',
    icon: 'download',
  },
  {
    key: 'delete',
    icon: 'delete',
  },
  {
    key: 'cancel',
    icon: 'close',
  },
]
const emit = defineEmits(['action'])
const onClick = (k) => {
  emit('action', k)
}
</script>

<template>
  <q-dialog
    ref="dialogRef"
    persistent
    seamless
    position="bottom">
    <q-card
      class="q-mb-md"
      flat
      bordered>
      <q-btn
        v-for="e in operations"
        :key="e"
        flat
        :icon="e.icon"
        @click="onClick(e.key)" />
    </q-card>
  </q-dialog>
</template>
