<template>
  <q-scroll-area
    ref="scrollAreaRef"
    class="fit">
    <div
      :id="id" />
  </q-scroll-area>
</template>
<script setup>
// import Konva from 'konva'
import { uid } from 'quasar'
import { onMounted, ref } from 'vue'
import { useKonva } from 'src/composition/useKonva'

const id = uid()
const scrollAreaRef = ref(null)

onMounted(() => {
  const scrollTarget = scrollAreaRef.value.getScrollTarget()
  useKonva(id, scrollTarget)
  // const stage = new Konva.Stage({
  //   container: id,
  //   width: 500,
  //   height: 500,
  // })

  // const objectsLayer = new Konva.Layer()
  // const linkLayer = new Konva.Layer()

  // const anchor1 = new Konva.Anchor({
  //   id: '1',
  //   x: 20,
  //   y: 20,
  //   draggable: true,

  // })
  // const anchor2 = new Konva.Anchor({
  //   id: '2',
  //   x: 40,
  //   y: 40,
  //   draggable: true,

  // })

  // const link1 = new Konva.Link({
  //   id: '3',
  //   from: '1',
  //   to: '5',
  // })
  // const functionBlock = new Konva.FunctionBlock({
  //   id: '4',
  //   x: 60,
  //   y: 60,
  //   width: 200,
  //   height: 200,
  //   draggable: true,
  // })
  // const test = new Konva.Test({
  //   draggable: true,
  //   x: 0,
  //   y: 0,
  // })

  // const itext = new Konva.IText({
  //   text: 'hhh',
  // })

  // linkLayer.add(link1)
  // objectsLayer.add(anchor1)
  // objectsLayer.add(anchor2)
  // objectsLayer.add(functionBlock)
  // objectsLayer.add(itext)

  // objectsLayer.add(test)

  // useKonva(stage, objectsLayer, linkLayer)

  // stage.add(linkLayer)
  // stage.add(objectsLayer)

  // link1.init()

  // console.log(stage.toJSON())

  // const container = stage.container()
  // container.style.border = '1px solid red'
})
</script>
