<script setup lang='ts'>
import { useDialogPluginComponent } from 'quasar'
import BlockOutputEvent from 'components/block/BlockOutputEvent'
import { OutputEvent } from 'src/models/OutputEvent'
import { ref } from 'vue'

defineEmits([
  ...useDialogPluginComponent.emits,
])
const {
  dialogRef, onDialogHide, onDialogOK,
} = useDialogPluginComponent()
const outputEvent = ref(new OutputEvent())
const onUpdate = (v) => {
  onDialogOK(v)
}
</script>
<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide">
    <block-output-event
      :target="outputEvent"
      @update:target="onUpdate" />
  </q-dialog>
</template>
