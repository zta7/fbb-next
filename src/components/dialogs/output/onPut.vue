<script setup lang='ts'>
import { useDialogPluginComponent } from 'quasar'
import BlockOutput from 'components/block/BlockOutput'
import { Output } from 'src/models/Output'
import { ref } from 'vue'

defineEmits([
  ...useDialogPluginComponent.emits,
])
const {
  dialogRef, onDialogHide, onDialogOK,
} = useDialogPluginComponent()
const output = ref(new Output())
const onUpdate = (v) => {
  onDialogOK(v)
}
</script>
<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide">
    <block-output
      :target="output"
      @update:target="onUpdate" />
  </q-dialog>
</template>
