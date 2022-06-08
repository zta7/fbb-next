<script setup>
import { useConfigStore } from 'stores/user'
import { useRouter, useRoute } from 'vue-router'
import {
  ref, watch, toRefs, nextTick,
} from 'vue'
import Sortable from 'sortablejs'
import { Dialog } from 'quasar'
import { useBlockStore } from 'stores/block'

const $block = useBlockStore()
const props = defineProps({
  tree: Array,
})

const { tree } = toRefs(props)

const route = useRoute()
const router = useRouter()
const $config = useConfigStore()
const folderActions = [
  {
    action: 'create', label: 'Create', icon: 'add', iconColor: 'negative',
  },
]
const itemActions = [
  {
    action: 'rename', label: 'Rename', icon: 'edit', iconColor: 'primary',
  },
  {
    action: 'delete', label: 'Delete', icon: 'delete', iconColor: 'negative',
  },
]
const onNavigate = (treeKey) => {
  router.push({ name: 'treeSelected', params: { treeSelected: treeKey } })
}

const sortables = []
watch(tree, async () => {
  console.log('update tree')
  await nextTick()
  sortables.forEach((e) => e && e.destory && e.destroy())
  const folders = Array.from(document.getElementsByClassName('folder'))
  folders.forEach((folder) => {
    const node = folder.closest('.q-tree__node')
    const f = node.querySelector('.q-tree__children')
    if (f && f.children) {
      Array.from(f.children).forEach((e) => {
        const item = e.querySelector('.item')
        const treeKey = item.getAttribute('data-id')
        e.setAttribute('data-id', treeKey)
      })
      const sortable = new Sortable(f, {
        animation: 150,
        delay: 100,
        direction: 'vertical',
        forceFallback: true,
        fallbackClass: 'hidden',
        onUpdate() {
          console.log(sortable.toArray())
        },
      })
      sortables.push(sortable)
    }
  })
}, { flush: 'post', immediate: true })

const treeRef = ref(null)
const onAction = async (action, node) => {
  if (action === 'create') {
    treeRef.value.setExpanded(node.treeKey, true)
    console.log('module', `src/components/dialogs/${node.treeKey}/onPut`)
    import(`src/components/dialogs/${node.treeKey}/onPut`)
      .then((component) => {
        console.log(component)
        Dialog.create({
          component: component.default,
        }).onOk((v) => {
          console.log(v)
        })
      })
      .catch((err) => {
        console.log(err)
        Dialog.create({
          title: 'Error',
          message: 'Cant find moudle!',
        })
      })
  } else if (action === 'rename') {
    node.isEditing = true
  } else if (action === 'delete') {
    console.log('delete', node)
  }
}
console.log(props.tree)

</script>
<template>
  <q-tree
    ref="treeRef"
    v-model:expanded="$config.blocks[$block.block.id].treeExpanded"
    :selected="route.params.treeSelected"
    class="q-py-md q-px-sm item-sortable"
    no-selection-unset
    :nodes="props.tree"
    :duration="100"
    node-key="treeKey">
    <template #default-header="{ node }">
      <div
        class="row items-center no-wrap full-width"
        @click="onNavigate(node.treeKey)">
        <q-icon
          class="q-mr-sm"
          :name="node.icon"
          :color="node.iconColor" />
        <span class="text-no-wrap">{{ node.label }}</span>
      </div>
    </template>

    <template #header-root="{node}">
      <div
        class="row items-center no-wrap full-width">
        <q-icon
          class="q-mr-sm"
          :name="node.icon"
          :color="node.iconColor" />
        <span class="text-no-wrap">{{ node.label }}</span>
      </div>
    </template>

    <template #header-folder="{ node }">
      <div class="row items-center no-wrap full-width folder">
        <q-icon
          class="q-mr-sm"
          :name="node.icon"
          :color="node.iconColor" />
        <span class="text-no-wrap">{{ node.label }} </span>
        <div
          class="q-ml-sm hover-button"
          flat
          bordered
          @click.stop="onAction('create', node)">
          <q-icon
            size="xs"
            name="add"
            color="red" />
        </div>
        <q-menu
          touch-position
          context-menu>
          <q-item
            v-for="(e, i) in folderActions"
            :key="i"
            v-close-popup
            dense
            clickable
            @click="onAction(e.action, node)">
            <q-item-section
              side>
              <q-icon
                size="xs"
                :name="e.icon"
                :color="e.iconColor" />
            </q-item-section>
            <q-item-section>{{ e.label }}</q-item-section>
          </q-item>
        </q-menu>
      </div>
    </template>

    <template #header-item="{ node }">
      <div
        v-if="!node.isEditing"
        class="row items-center no-wrap full-width item"
        :data-id="node.treeKey"
        @click="onNavigate(node.treeKey)">
        <q-icon
          class="q-mr-sm"
          :name="node.icon"
          :color="node.iconColor" />
        <span
          class="text-no-wrap">{{ node.label }}</span>
        <q-menu
          touch-position
          context-menu>
          <q-item
            v-for="(e, i) in itemActions"
            :key="i"
            v-close-popup
            dense
            clickable
            @click="onAction(e.action, node)">
            <q-item-section side>
              <q-icon
                size="xs"
                :name="e.icon"
                :color="e.iconColor" />
            </q-item-section>
            <q-item-section>
              {{ e.label }}
            </q-item-section>
          </q-item>
        </q-menu>
      </div>
      <div
        v-else
        class="row items-center no-wrap full-width">
        <q-icon
          class="q-mr-sm"
          :name="node.icon"
          :color="node.iconColor" />
        <q-input
          v-model="node.label"
          class="text-no-wrap"
          style="height: 21px"
          :input-style="{ padding: '0 0', height: '21px' , cursor: 'pointer'}"
          borderless
          hide-bottom-space
          dense
          autofocus
          @foucs.prevent
          @blur="node.isEditing = false"
          @keydown.enter="evt => evt.target.blur()" />
      </div>
    </template>
  </q-tree>
</template>
<style lang="scss" scoped>
  .folder {
    .hover-button{
      display: none;
    }
    &:hover {
      >.hover-button {
        display: block
      }
    }
  }
</style>
