<script setup lang='ts'>
import { useDialogPluginComponent } from 'quasar'
import { useBlockStore } from 'stores/block'
import { useForm, useField } from 'vee-validate'
import { types } from 'define/blocks'
import { Block, schema } from 'src/models/Block'
import { isReactive } from 'vue'

defineEmits([
  ...useDialogPluginComponent.emits,
])

const props = defineProps({
  block: {
    type: Block,
    default: () => (new Block()),
  },
})

// eslint-disable-next-line vue/no-setup-props-destructure
const { block } = props
const $block = useBlockStore()

const {
  dialogRef, onDialogHide, onDialogOK,
} = useDialogPluginComponent()

// const block = new Block()

const {
  validate, errors, values, meta,
} = useForm(({
  initialValues: { ...block },
  validationSchema: schema,
}))
useField('name')
useField('namespace')
useField('type')

const onOkClick = async () => {
  const { valid } = await validate()
  if (valid) {
    block.updateFields(values)
    onDialogOK(block)
  }
}

</script>
<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="text-h6">
        {{ isReactive(block) ? 'Edit' : 'Create' }} Block
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="values.name"
          hide-bottom-space
          :error="Boolean(errors.name)"
          :error-message="errors.name"
          label="Name" />
        <q-select
          v-model="values.namespace"
          hide-bottom-space
          :error="Boolean(errors.namespace)"
          :error-message="errors.namespace"
          label="Namespace"
          use-input
          fill-input
          hide-selected
          :options="$block.namespaces"
          @input-value="v => values.namespace = v" />
        <q-select
          v-model="values.type"
          hide-bottom-space
          :error="Boolean(errors.type)"
          :error-message="errors.type"
          label="Type"
          :options="types" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          :disabled="!meta.dirty || !meta.valid"
          color="primary"
          label="OK"
          @click="onOkClick()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
