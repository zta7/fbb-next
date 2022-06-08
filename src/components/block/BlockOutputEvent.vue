<script setup>
import {
  computed, toRefs, watch,
} from 'vue'
import { useBlockStore } from 'stores/block'
import { useForm, useField } from 'vee-validate'
import { OutputEvent, schema } from 'src/models/OutputEvent'

const props = defineProps({
  target: OutputEvent,
})
const { target: outputEvent } = toRefs(props)

const emit = defineEmits(['update:target'])

const $block = useBlockStore()
const outputOptions = computed(() => $block.block.outputs.map((e) => ({
  label: e.label,
  value: e.id,
})))

const {
  values, errors, meta, resetForm, validate,
} = useForm({
  validationSchema: schema,
})

watch(outputEvent, (n) => {
  resetForm({
    values: { ...n },
  })
}, { immediate: true })

useField('label')
useField('inputs')
useField('comment')

const onOk = async () => {
  const { valid } = await validate()
  if (valid) {
    outputEvent.value.updateFields(values)
    resetForm({
      values: { ...outputEvent.value },
    })
    emit('update:target', values)
  }
}

</script>
<template>
  <q-card
    class="absolute-center"
    style="min-width: 260px;max-width: 400px">
    <q-card-section class="text-h6 q-pb-none">
      OutputEvent Properties
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="values.label"
        :error="Boolean(errors.label)"
        :error-message="errors.label"
        hide-bottom-space
        label="Label" />
      <q-select
        v-model="values.inputs"
        label="Inputs"
        :options="outputOptions"
        multiple
        emit-value
        map-options />
      <q-input
        v-model="values.comment"
        label="Comment" />
    </q-card-section>
    <q-card-actions align="right">
      <slot name="button" />
      <q-btn
        color="primary"
        label="OK"
        :disabled="!meta.dirty || !meta.valid"
        @click="onOk()" />
    </q-card-actions>
  </q-card>
</template>
