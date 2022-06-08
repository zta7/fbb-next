<script setup lang='ts'>
import { useDialogPluginComponent } from 'quasar'
import BlockInputEvent from 'components/block/BlockInputEvent'
import { InputEvent } from 'src/models/InputEvent'
import { ref } from 'vue'

defineEmits([
  ...useDialogPluginComponent.emits,
])
const {
  dialogRef, onDialogHide, onDialogOK,
} = useDialogPluginComponent()
const inputEvent = ref(new InputEvent())
const onUpdate = (v) => {
  onDialogOK(v)
}
</script>
<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide">
    <block-input-event
      :target="inputEvent"
      @update:target="onUpdate" />
  </q-dialog>
</template>
