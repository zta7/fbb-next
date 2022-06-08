<template>
  <q-drawer
    :model-value="true"
    :width="width"
    :mini-width="miniWidth"
    :mini="isMini"
    behavior="desktop">
    <div
      :id="id"
      class="fit no-scroll column no-wrap">
      <q-item
        class="justify-center items-center"
        style="height: 56px">
        <q-icon
          v-if="isMini"
          class="cursor-pointer"
          name="search"
          size="24px"
          @click="onMiniClick()" />
        <q-input
          v-else
          ref="filterRef"
          v-model="filter"
          class="q-mr-none"
          style="width: 100%"
          placeholder="Search Name"
          dense
          outlined />
      </q-item>
      <q-scroll-area
        id="scroll-area-with-virtual-scroll-1"
        class="col-grow"
        :visible="false">
        <q-virtual-scroll
          v-slot="{ item: e }"
          scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
          :virtual-scroll-slice-ratio-before="1"
          :virtual-scroll-slice-ratio-after="1"
          :virtual-scroll-slice-size="10"
          :virtual-scroll-item-size="56"
          :items="blocks">
          <q-item
            :key="e.id"
            :data-id="e.id"
            :class="{ 'sortable-pin': e.pin }"
            active-class="bg-teal-6 text-white"
            tag="label"
            :draggable="false"
            :to="{ name: 'Block', params: { type: e.type, id: e.id } }"
            clickable>
            <q-item-section
              avatar
              class="row items-center">
              <q-icon
                side
                :name="`img:blocks/${e.type}.svg`"
                size="40px" />
            </q-item-section>
            <q-item-section>
              {{ e.name }}
            </q-item-section>
            <q-item-section
              side
              top
              class="text-caption q-mr-none"
              style="color: inherit">
              <span>03:12</span>
              <span>
                <q-icon
                  v-if="e.pin"
                  name="mdi-pin" />
              </span>
            </q-item-section>

            <q-menu
              touch-position
              context-menu>
              <q-list
                dense
                class="text-caption"
                style="min-width: 100px">
                <!-- <q-item
                  v-close-popup
                  clickable
                  @click="onContextMenu(e, 'togglePin')">
                  <q-item-section side>
                    <q-icon
                      name="mdi-pin"
                      size="xs" />
                  </q-item-section>
                  <q-item-section>{{ e.pin ? 'unpin' : 'pin' }}</q-item-section>
                </q-item> -->
                <q-item
                  v-close-popup
                  clickable
                  @click="onContextMenu(e, 'edit')">
                  <q-item-section side>
                    <q-icon
                      name="mdi-pencil"
                      size="xs" />
                  </q-item-section>
                  <q-item-section>Edit Block</q-item-section>
                </q-item>
                <q-item
                  v-close-popup
                  clickable
                  class="text-negative"
                  @click="onContextMenu(e, 'delete')">
                  <q-item-section
                    side
                    style="color: inherit">
                    <q-icon
                      name="mdi-delete"
                      size="xs" />
                  </q-item-section>
                  <q-item-section>Delete Block</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
        </q-virtual-scroll>
      </q-scroll-area>
    </div>
    <div
      v-touch-pan.horizontal.prevent.stop.mouse="onTouchPan"
      class="absolute full-height"
      style="cursor: col-resize; right: -8px; top: 0; width: 8px"
      @mousedown="onMousedown">
      <q-separator
        class="full-height"
        vertical
        size="0.9px" />
    </div>
  </q-drawer>
</template>
<script setup>
import {
  ref, computed, nextTick, onMounted,
} from 'vue'
import { useConfigStore } from 'stores/user'
import { useBlockStore } from 'stores/block'
import { storeToRefs } from 'pinia'
import { pull, chain } from 'lodash'
import onPutDialog from 'components/dialogs/block/onPut'
import onConfirm from 'components/dialogs/onConfirm'
import { Dialog, uid } from 'quasar'
import Sortable from 'sortablejs'

const $config = useConfigStore()
const $block = useBlockStore()
const { view, selected } = storeToRefs($config)
const filter = ref('')
const filterRef = ref(null)
const id = uid()

const blocks = computed(() => {
  console.log(`update blocks( view: ${view.value} selectedValue: ${selected.value} )`)
  const result = chain($block.blocks)
    .filter((e) => e.name.startsWith(filter.value)
      && (selected.value === 'All' || e[view.value] === selected.value))
    .orderBy(['pin'], ['desc'])
  return result.value()
})

const onContextMenu = (block, action) => {
  console.log(block)
  if (action === 'delete') {
    Dialog.create({
      component: onConfirm,
      componentProps: {
        action: 'delete',
      },
    }).onOk(() => {
      pull($block.blocks, block)
    })
  } else if (action === 'edit') {
    Dialog.create({
      component: onPutDialog,
      componentProps: {
        block,
      },
    })
  }
  // else if (action === 'togglePin') block.togglePin()
}

onMounted(() => {
  const el = document.getElementById(id)
  const el2 = el.querySelector('.q-virtual-scroll__content')
  const sortable = new Sortable(el2, {
    animation: 150,
    delay: 100,
    direction: 'vertical',
    forceFallback: true,
    fallbackClass: 'hidden',
    draggable: '.sortable-pin',
    onUpdate() {
      console.log(sortable.toArray())
    },
  })
})

const miniWidth = 65
const middleX = 77.5 + 65
const regularWidth = 220
const maxWidth = 400
const width = ref(220)
const isMini = computed(() => width.value === miniWidth)
let widthCache = width.value

const onMiniClick = async () => {
  width.value = regularWidth
  await nextTick()
  filterRef.value.focus()
}

const onMousedown = () => {
  widthCache = width.value
}

const fn = (offset) => {
  let result = width.value + offset.value
  if (result > maxWidth) result = maxWidth
  else if (result < regularWidth) {
    if (widthCache < middleX) {
      result = miniWidth
    } else result = regularWidth
  }
  width.value = result
  widthCache += offset.value

  offset.value = 0
}

const offset = ref(0)
const onTouchPan = ({ delta }) => {
  const { x } = delta
  if (x === 0) return
  offset.value += x
  fn(offset)
}
</script>
