<script setup lang='ts'>
import { useDialogPluginComponent } from 'quasar'
import BlockInput from 'components/block/BlockInput'
import { Input } from 'src/models/Input'
import { ref } from 'vue'

defineEmits([
  ...useDialogPluginComponent.emits,
])
const {
  dialogRef, onDialogHide, onDialogOK,
} = useDialogPluginComponent()
const input = ref(new Input())
const onUpdate = (v) => {
  onDialogOK(v)
}
</script>
<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide">
    <block-input
      :target="input"
      @update:target="onUpdate" />
  </q-dialog>
</template>
