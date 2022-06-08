<script setup>
import {
  dia,
} from '@clientio/rappid'
// import { Ellipse } from 'boot/joint'
import { onMounted } from 'vue'

console.log(dia)
onMounted(() => {
  // const namespace = joint.shapes
  // console.log(namespace)
  // const graph = new joint.dia.Graph({}, { cellNamespace: namespace })
  // const paper = new joint.dia.Paper({
  //   el: document.getElementById('myholder'),
  //   model: graph,
  //   width: 600,
  //   height: 100,
  //   gridSize: 10,
  //   drawGrid: true,
  //   background: {
  //     color: 'rgba(0, 255, 0, 0.3)',
  //   },
  //   cellViewNamespace: namespace,
  // })
  // const e = (new Ellipse()).position(100, 100).size(120, 50).addTo(graph)
  // console.log(e, paper)

  // const rect = new joint.shapes.standard.Rectangle()
  // rect.position(50, 25)
  // rect.resize(500, 50)
  // rect.attr({
  //   text: {
  //     text: 'shapes.standard.Rectangle()',
  //   },
  // })
  // const rect3 = new joint.shapes.examples.CustomRectangle()
  // rect3.position(50, 225)
  // rect3.resize(500, 50)
  // rect3.attr({
  //   label: {
  //     text: 'shapes.examples.CustomRectangle()',
  //   },
  // })
  // rect3.addTo(graph)
})
</script>
<template>
  <q-page
    class="relative-position"
    :style-fn="(offset, height) => { return { width: '100%', height: `${height - offset}px` }}">
    <div
      id="myholder"
      class="fit" />
    <input
      id="img"
      type="file"
      style="display: none;">
  </q-page>
</template>
