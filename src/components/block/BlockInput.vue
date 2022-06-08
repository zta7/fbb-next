<script setup>
import {
  toRefs, watch,
} from 'vue'
import { useForm, useField } from 'vee-validate'
import { Input, schema } from 'src/models/Input'
import { dataTypes } from 'define/blocks'

const props = defineProps({
  target: Input,
})
const { target: input } = toRefs(props)

const emit = defineEmits(['update:target'])

const {
  values, errors, meta, resetForm, validate,
} = useForm({
  validationSchema: schema,
})

watch(input, (n) => {
  resetForm({
    values: { ...n },
  })
}, { immediate: true })

useField('label')
useField('type')
useField('arrayLength')
useField('initVals')
useField('comment')

const onOk = async () => {
  const { valid } = await validate()
  if (valid) {
    input.value.updateFields(values)
    resetForm({
      values: { ...input.value },
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
      Input Properties
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="values.label"
        :error="Boolean(errors.label)"
        :error-message="errors.label"
        hide-bottom-space
        label="Label" />
      <q-select
        v-model="values.type"
        :options="dataTypes"
        :error="Boolean(errors.type)"
        :error-message="errors.type"
        hide-bottom-space
        label="Type" />
      <q-input
        v-model.number="values.arrayLength"
        :error="Boolean(errors.arrayLength)"
        :error-message="errors.arrayLength"
        hide-bottom-space
        label="ArrayLength" />
      <q-input
        v-model="values.initVals"
        label="InitVals" />
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
