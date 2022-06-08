<script setup>
import BlockPageLayout from 'layouts/BlockPageLayout'
import {
  ref, provide, watch, defineComponent, markRaw, shallowRef, computed,
} from 'vue'
// import { Observable } from 'object-observer'
import { useBlockStore } from 'stores/block'
import { storeToRefs } from 'pinia'
import { uid } from 'quasar'
import define from 'define/blocks'
import { useRoute } from 'vue-router'
import { InputEvent } from 'src/models/InputEvent'
import { OutputEvent } from 'src/models/OutputEvent'
import { Input } from 'src/models/Input'
import { Output } from 'src/models/Output'
import { Internal } from 'src/models/Internal'
import { Temp } from 'src/models/Temp'
import { Algorithm } from 'src/models/Algorithm'
import { Interface } from 'src/models/Interface'
import { Properties } from 'src/models/Properties'
import { Panel } from 'src/models/Panel'
import { ECC } from 'src/models/ECC'

console.log('5')

const $block = useBlockStore()
const route = useRoute()
const AsyncComp = ref(null)

const { block } = storeToRefs($block)
const tree = shallowRef([])
const main = ref(null)
provide('block', block)
provide('tree', tree)
provide('main', main)

const routeParams = computed(() => route.params)

watch(routeParams, async (n, o) => {
  console.log('Start Update BlockPage component')
  const { id, type, treeSelected } = n
  const { id: oId, type: oType } = o || {}
  if (type !== oType) {
    console.log('update component by block type')
    const component = await new Promise((resolve) => {
      import(`components/${type}`)
        .then((comp) => {
          resolve(comp)
        })
        .catch(() => resolve(null))
    })
    if (component !== null) AsyncComp.value = markRaw(defineComponent(component.default))
    else AsyncComp.value = null
  }

  if (id !== oId) {
    console.log('update block by block id')
    const { block: newBlock, tree: newTree } = await new Promise((resolve) => {
      const r = resolve
      setTimeout(() => {
        if (type === 'BasicFunctionBlock') {
          const tempBlock = {
            id,
            name: '1',
            namespace: '2',
            type: 'BasicFunctionBlock',
            properties: new Properties({
              version: 2,
            }),
            inputEvents: Array.from({ length: 5 }, (e, i) => (new InputEvent({ label: `inputEvents${i}` }))),
            outputEvents: Array.from({ length: 5 }, (e, i) => (new OutputEvent({ label: `outputEvents${i}` }))),
            inputs: Array.from({ length: 5 }, (e, i) => (new Input({ label: `inputs${i}` }))),
            outputs: Array.from({ length: 5 }, (e, i) => (new Output({ label: `outputs${i}` }))),
            internals: Array.from({ length: 5 }, (e, i) => (new Internal({ label: `internals${i}` }))),
            temps: Array.from({ length: 5 }, (e, i) => (new Temp({ label: `temps${i}` }))),
            algorithms: Array.from({ length: 5 }, (e, i) => (new Algorithm({ label: `Algorithm${i}` }))),
          }
          const tempTree = [{
            label: 'BasicFunctionBlock',
            icon: 'img:blocks/BasicFunctionBlock.svg',
            treeKey: id,
            selectable: false,
            header: 'root',
            children: [
              {
                label: 'Properties',
                treeKey: `Properties.${id}`,
                icon: 'mdi-book-edit-outline',
                iconColor: 'teal-8',
              },
              {
                label: 'Interface',
                treeKey: `Interface.${id}`,
                icon: 'mdi-resistor-nodes',
                iconColor: 'teal-8',
                children: [
                  {
                    label: 'Input Events',
                    treeKey: 'inputEvent',
                    icon: 'folder',
                    iconColor: 'orange-4',
                    header: 'folder',
                    sortable: true,
                    selectable: false,
                    children: [
                      ...tempBlock.inputEvents.map((e) => ({
                        ...define[type].inputEvent,
                        ...e,
                        treeKey: `${e.constructor.name}.${e.id}`,
                      })),
                    ],
                  },
                  {
                    label: 'Output Events',
                    treeKey: 'outputEvent',
                    icon: 'folder',
                    iconColor: 'orange-4',
                    header: 'folder',
                    selectable: false,
                    children: [
                      ...tempBlock.outputEvents.map((e) => ({
                        ...define[type].outputEvent,
                        ...e,
                        treeKey: `${e.constructor.name}.${e.id}`,
                      })),
                    ],
                  },
                  {
                    label: 'Inputs',
                    treeKey: 'input',
                    icon: 'folder',
                    iconColor: 'orange-4',
                    header: 'folder',
                    selectable: false,
                    children: [
                      ...tempBlock.inputs.map((e) => ({
                        ...define[type].input,
                        ...e,
                        treeKey: `${e.constructor.name}.${e.id}`,
                      })),
                    ],
                  },
                  {
                    label: 'Outputs',
                    treeKey: 'output',
                    icon: 'folder',
                    iconColor: 'orange-4',
                    header: 'folder',
                    selectable: false,
                    children: [
                      ...tempBlock.outputs.map((e) => ({
                        ...define[type].output,
                        ...e,
                        treeKey: `${e.constructor.name}.${e.id}`,
                      })),
                    ],
                  },
                  {
                    label: 'Internals',
                    treeKey: 'internal',
                    icon: 'folder',
                    iconColor: 'orange-4',
                    header: 'folder',
                    selectable: false,
                    children: [
                      ...tempBlock.internals.map((e) => ({
                        ...define[type].internal,
                        ...e,
                        treeKey: `${e.constructor.name}.${e.id}`,
                      })),
                    ],
                  },
                  {
                    label: 'Temps',
                    treeKey: 'temp',
                    icon: 'folder',
                    iconColor: 'orange-4',
                    header: 'folder',
                    selectable: false,
                    children: [
                      ...tempBlock.temps.map((e) => ({
                        ...define[type].temp,
                        ...e,
                        treeKey: `${e.constructor.name}.${e.id}`,
                      })),
                    ],
                  },
                ],
              },
              {
                label: 'ECC',
                treeKey: 'ECC',
                icon: 'mdi-chart-timeline-variant',
                iconColor: 'teal-8',
              },
              {
                label: 'Algorithms',
                treeKey: 'algorithm',
                icon: 'folder',
                iconColor: 'orange-4',
                header: 'folder',
                selectable: true,
                children: [
                  ...tempBlock.algorithms.map((e) => ({
                    ...define[type].algorithm,
                    ...e,
                    treeKey: `${e.constructor.name}.${e.id}`,
                  })),
                ],
              },
            ],
          }]
          r({
            block: tempBlock,
            tree: tempTree,
          })
        } else if (type === 'HMI') {
          const tempBlock = {
            id,
            name: '1',
            namespace: '2',
            type: 'HMI',
            properties: new Properties({
              version: 2,
            }),
            inputEvents: Array.from({ length: 5 }, (e, i) => (new InputEvent({ label: `inputEvents${i}` }))),
            outputEvents: Array.from({ length: 5 }, (e, i) => (new OutputEvent({ label: `outputEvents${i}` }))),
            inputs: Array.from({ length: 5 }, (e, i) => (new Input({ label: `inputs${i}` }))),
            outputs: Array.from({ length: 5 }, (e, i) => (new Output({ label: `outputs${i}` }))),
            mapping: [],
            panel: new Panel(),
          }
          const tempTree = [{
            label: 'HMI',
            icon: 'img:blocks/HMI.svg',
            treeKey: id,
            selectable: false,
            header: 'root',
            children: [
              {
                label: 'Properties',
                treeKey: `Properties.${id}`,
                icon: 'mdi-book-edit-outline',
                iconColor: 'teal-8',
              },
              {
                label: 'Interface',
                treeKey: `Interface.${id}`,
                icon: 'mdi-resistor-nodes',
                iconColor: 'teal-8',
                children: [
                  {
                    label: 'Input Events',
                    treeKey: 'inputEvent',
                    icon: 'folder',
                    iconColor: 'orange-4',
                    header: 'folder',
                    sortable: true,
                    selectable: false,
                    children: [
                      ...tempBlock.inputEvents.map((e) => ({
                        ...define[type].inputEvent,
                        ...e,
                        treeKey: `${e.constructor.name}.${e.id}`,
                      })),
                    ],
                  },
                  {
                    label: 'Output Events',
                    treeKey: 'outputEvent',
                    icon: 'folder',
                    iconColor: 'orange-4',
                    header: 'folder',
                    selectable: false,
                    children: [
                      ...tempBlock.outputEvents.map((e) => ({
                        ...define[type].outputEvent,
                        ...e,
                        treeKey: `${e.constructor.name}.${e.id}`,
                      })),
                    ],
                  },
                  {
                    label: 'Inputs',
                    treeKey: 'input',
                    icon: 'folder',
                    iconColor: 'orange-4',
                    header: 'folder',
                    selectable: false,
                    children: [
                      ...tempBlock.inputs.map((e) => ({
                        ...define[type].input,
                        ...e,
                        treeKey: `${e.constructor.name}.${e.id}`,
                      })),
                    ],
                  },
                  {
                    label: 'Outputs',
                    treeKey: 'output',
                    icon: 'folder',
                    iconColor: 'orange-4',
                    header: 'folder',
                    selectable: false,
                    children: [
                      ...tempBlock.outputs.map((e) => ({
                        ...define[type].output,
                        ...e,
                        treeKey: `${e.constructor.name}.${e.id}`,
                      })),
                    ],
                  },
                ],
              },
              {
                label: 'Panel',
                treeKey: `Panel.${id}`,
                icon: 'mdi-view-dashboard-outline',
                iconColor: 'teal-8',
              },
            ],
          }]
          r({
            block: tempBlock,
            tree: tempTree,
          })
        } else if (type === 'SystemConfiguration') {
          const tempBlock = {
            id,
            name: '1',
            namespace: '2',
            type: 'SystemConfiguration',
            properties: new Properties({
              version: 2,
            }),
            depolyment: [],
            applications: [
              ...Array.from({ length: 5 }, (e, i) => ({ id: `Application.${uid()}`, label: `Application${i}` })),
            ],
            collections: [],
            canvas: '',
          }
          const tempTree = [{
            label: 'SystemConfiguration',
            icon: 'img:blocks/SystemConfiguration.svg',
            treeKey: id,
            selectable: false,
            header: 'root',
            children: [
              {
                label: 'Properties',
                treeKey: `Properties.${id}`,
                icon: 'mdi-book-edit-outline',
                iconColor: 'teal-8',
              },
              {
                label: 'Applications',
                id: `Applications.${id}`,
                icon: 'folder',
                iconColor: 'orange-4',
                children: [
                  ...tempBlock.applications.map((e) => ({
                    ...define[type].application,
                    ...e,
                    treeKey: `${e.constructor.name}.${e.id}`,
                  })),
                ],
              },
            ],
          }]
          r({
            block: tempBlock,
            tree: tempTree,
          })
        } else r({})
      }, 200)
    })
    // block.value = newBlock
    tree.value = newTree
    if (newBlock) {
      block.value = newBlock
      // console.log('observe block')
      // const observableBlock = Observable.from(newBlock)
      // block.value = observableBlock
      // Observable.observe(observableBlock, (changes) => {
      //   console.log(changes)
      // })
    } else block.value = null
  }
  if (block.value && treeSelected) {
    console.log('update main object')
    const [key, targetId] = treeSelected.split('.')
    if (key === 'Properties') main.value = block.value.properties
    else if (key === 'InputEvent') {
      main.value = block.value.inputEvents.find((e) => e.id === targetId)
    } else if (key === 'OutputEvent') {
      main.value = block.value.outputEvents.find((e) => e.id === targetId)
    } else if (key === 'Input') {
      main.value = block.value.inputs.find((e) => e.id === targetId)
    } else if (key === 'Output') {
      main.value = block.value.outputs.find((e) => e.id === targetId)
    } else if (key === 'Internal') {
      main.value = block.value.internals.find((e) => e.id === targetId)
    } else if (key === 'Temp') {
      main.value = block.value.temps.find((e) => e.id === targetId)
    } else if (key === 'Algorithm') {
      main.value = block.value.algorithms.find((e) => e.id === targetId)
    } else if (key === 'Application') {
      main.value = block.value.applications.find((e) => e.id === targetId)
    } else if (key === 'Interface') {
      main.value = new Interface({
        inputEvents: block.value.inputEvents,
        outputEvents: block.value.outputEvents,
        inputs: block.value.inputs,
        outputs: block.value.outputs,
        internals: block.value.internals,
        temps: block.value.temps,
      })
    } else if (key === 'Panel') {
      main.value = block.value.panel
    } else if (key === 'ECC') {
      main.value = new ECC()
    } else {
      main.value = null
    }
  }
  console.log('End Update BlockPage component')
}, { immediate: true })

</script>
<template>
  <block-page-layout>
    <q-page
      :style-fn="(offset, height) => { return { height: (height-offset) + 'px' } }"
      class="row no-wrap">
      <div
        v-if="AsyncComp"
        class="fit">
        <async-comp
          v-if="block"
          class="fit" />
      </div>
      <div v-else>
        No Avaliable FunctionBlock Component
      </div>
    </q-page>
  </block-page-layout>
</template>
