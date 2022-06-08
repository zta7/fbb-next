<script setup lang='ts'>
import { useDialogPluginComponent } from 'quasar'
import { computed } from 'vue'

const props = defineProps({
  action: String,
})
const confirmMessage = computed(() => {
  if (props.action === 'delete') return 'Delete ?'

  return 'Require action prop'
})

defineEmits([
  ...useDialogPluginComponent.emits,
])
const {
  dialogRef, onDialogHide, onDialogOK,
} = useDialogPluginComponent()
</script>
<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide">
    <q-card>
      <q-card-section>
        {{ confirmMessage }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="OK"
          @click="onDialogOK()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
