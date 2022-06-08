<script setup lang='ts'>
import {
  computed, toRefs, watch,
} from 'vue'
import { useBlockStore } from 'stores/block'
import { useForm, useField } from 'vee-validate'
import { InputEvent, schema } from 'src/models/InputEvent'

const props = defineProps({
  target: InputEvent,
})
const { target: inputEvent } = toRefs(props)

const emit = defineEmits(['update:target'])

const $block = useBlockStore()
const inputOptions = computed(() => $block.block.inputs.map((e) => ({
  label: e.label,
  value: e.id,
})))

const {
  values, errors, meta, resetForm, validate,
} = useForm({
  validationSchema: schema,
})

// console.log('em.........')

watch(inputEvent, (n) => {
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
    inputEvent.value.updateFields(values)
    resetForm({
      values: { ...inputEvent.value },
    })
    emit('update:target', values)
  }
}

</script>
<template>
  <q-card
    ref="card"
    class="absolute-center"
    style="min-width: 260px;max-width: 400px">
    <q-card-section class="text-h6 q-pb-none">
      InputEvent Properties
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
        :options="inputOptions"
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
