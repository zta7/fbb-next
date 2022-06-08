<script setup>
import {
  defineComponent, ref, watch, markRaw, inject,
} from 'vue'
import { get } from 'lodash'
import BlockMainLayout from 'layouts/BlockMainLayout'

const main = inject('main')
const AsyncComp = ref(null)
const target = ref(null)
const AsyncCompRef = ref(null)

watch(main, async (n, o) => {
  if (!n) {
    AsyncComp.value = null
  } else if (n.constructor.name !== get(o, 'constructor.name')) {
    const component = await new Promise((resolve) => {
      import(`./Block${n.constructor.name}`)
        .then((comp) => {
          resolve(comp)
        })
        .catch(() => resolve(null))
    })
    if (component !== null) AsyncComp.value = markRaw(defineComponent(component.default))
    else AsyncComp.value = null
  }
  target.value = n
}, { immediate: true })

watch(AsyncComp, (n) => {
  console.log(n)
})

</script>
<template>
  <BlockMainLayout>
    <q-page
      v-if="AsyncComp"
      class="no-scroll"
      :style-fn="(offset, height) => { return { height: (height-offset) + 'px' } }">
      <AsyncComp
        v-if="target"
        ref="AsyncCompRef"
        :target="target" />
      <div v-else>
        No Avaliable TreeSelected
      </div>
    </q-page>
    <div v-else>
      No Avaliable TreeSelected Component
    </div>
  </BlockMainLayout>
</template>
