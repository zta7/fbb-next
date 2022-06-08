<script setup lang='ts'>
import { useDialogPluginComponent } from 'quasar'

defineEmits([
  ...useDialogPluginComponent.emits,
])
const {
  dialogRef, onDialogHide, onDialogOK, onDialogCancel,
} = useDialogPluginComponent()
</script>
<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-actions align="right">
        <q-btn
          color="negative"
          label="Cancel"
          @click="onDialogCancel" />
        <q-btn
          color="primary"
          label="OK"
          @click="onDialogOK()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
