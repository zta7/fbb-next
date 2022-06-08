<template>
  <q-drawer
    :model-value="true"
    side="left"
    :width="65"
    behavior="desktop"
    class="column bg-grey-10 text-white no-scroll">
    <div
      v-bind="itemBind"
      :class="$config.selected === 'All' ? 'bg-grey-8': ''"
      @click="$config.selected = 'All'">
      <q-icon
        name="mdi-wall"
        size="28px" />
      <span v-bind="itemSpanBind">All Blocks</span>
    </div>
    <q-scroll-area
      ref="scrollAreaRef"
      class="col-grow">
      <div class="sortable">
        <div
          v-for="(e, i) in folders"
          v-bind="itemBind"
          :key="i"
          class="sort-item"
          :data-id="e.group"
          :class="$config.selected === e.group ? 'bg-grey-9': ''"
          @click="$config.selected = e.group">
          <q-icon
            :name="e.icon"
            size="28px" />
          <span v-bind="itemSpanBind">
            {{ e.caption || e.group }}</span>
        </div>
      </div>
    </q-scroll-area>

    <div
      v-bind="itemBind"
      @click="onPut()">
      <q-icon
        name="add"
        size="28px" />
      <span v-bind="itemSpanBind">Create</span>
    </div>
  </q-drawer>
</template>
<script setup>
import {
  ref, computed, onMounted,
} from 'vue'
import { useConfigStore } from 'stores/user'
import { useBlockStore } from 'stores/block'
import { cloneDeep } from 'lodash'
import Sortable from 'sortablejs'
import onPutDialog from 'components/dialogs/block/onPut'
import { Dialog } from 'quasar'
import blockConfig, { types } from 'define/blocks'

const $config = useConfigStore()
const $block = useBlockStore()
const scrollAreaRef = ref(null)
const { typesSort, namespacesSort } = $config
const folders = computed(() => {
  // sort 会破环原始对象 所以 clone一下
  if ($config.view === 'type') {
    return cloneDeep(types)
      .sort((a, b) => typesSort.indexOf(a) - typesSort.indexOf(b))
      .map((e) => ({
        group: e,
        ...blockConfig[e],
      }))
  }
  if ($config.view === 'namespace') {
    return cloneDeep($block.namespaces)
      .sort((a, b) => namespacesSort.indexOf(a) - namespacesSort.indexOf(b))
      .map((e) => ({
        group: e,
        icon: 'folder',
      }))
  }
  return []
})

onMounted(() => {
  const sortable = new Sortable(document.querySelector('.sortable'), {
    animation: 150,
    delay: 100,
    direction: 'vertical',
    forceFallback: true,
    fallbackClass: 'hidden',
    onUpdate() {
      if ($config.view === 'type') $config.typesSort = sortable.toArray()
      else if ($config.view === 'namespace') $config.namespacesSort = sortable.toArray()
    },
  })
})

const itemBind = {
  class: 'column no-wrap items-center justify-between q-py-xs cursor-pointer',
  size: '28px',
  style: 'height: 56px',
}
const itemSpanBind = {
  class: 'text-caption full-width text-center',
  style: 'word-break: break-all;font-size: 0.01rem;',
}

const onPut = () => {
  Dialog.create({
    component: onPutDialog,
  }).onOk((v) => {
    $block.blocks.splice(0, 0, v)
  })
}
</script>

<style lang="scss">
    .sortable-fallback {
    display: none
  }
</style>
