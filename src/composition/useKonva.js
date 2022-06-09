/* eslint-disable @typescript-eslint/no-unused-vars */
import Konva from 'konva'
import { useResizeObserver } from '@vueuse/core'

const updateStageBoundary = (stage, objectsLayer, linkLayer) => {
  const { x, y } = stage.getClientRect()
  objectsLayer.getChildren((e) => {
    e.x(e.x() - x)
    e.y(e.y() - y)
  })
  const { width, height } = stage.getClientRect()
  stage.setAttrs({
    width: Math.max(width + 1, stage.scrollTargetRect.width),
    height: Math.max(height + 1, stage.scrollTargetRect.height),
  })
  // width: Math.max(width + 1, stage.scrollTargetRect.width),
  // height: Math.max(height + 1, stage.scrollTargetRect.height),
  linkLayer.getChildren().forEach((e) => e._updatePoints())
}

export const useKonva = (id, scrollTarget) => {
  const stage = new Konva.Stage({ container: id, width: 0, height: 0 })
  const objectsLayer = new Konva.Layer()
  const linkLayer = new Konva.Layer()
  const toolLayer = new Konva.Layer()

  stage.add(objectsLayer); stage.add(linkLayer); stage.add(toolLayer)
  // first init nodes
  const anchor1 = new Konva.Anchor({
    id: '1',
    x: 20,
    y: 20,
    draggable: true,

  })
  const anchor2 = new Konva.Anchor({
    id: '2',
    x: 40,
    y: 40,
    draggable: true,

  })
  const functionBlock = new Konva.FunctionBlock({
    id: '4',
    x: 60,
    y: 60,
    width: 200,
    height: 200,
    draggable: true,
  })
  const test = new Konva.Test({
    draggable: true,
    x: 0,
    y: 0,
  })

  const itext = new Konva.IText({
    text: 'hhh',
  })

  objectsLayer.add(anchor1)
  objectsLayer.add(anchor2)
  objectsLayer.add(functionBlock)
  objectsLayer.add(itext)
  objectsLayer.add(test)

  // then links
  const link1 = new Konva.Link({
    id: '3',
    from: '1',
    to: '5',
  }, stage)
  linkLayer.add(link1)

  const tr = new Konva.Transformer({
    rotateEnabled: false,
    visible: false,
    // resizeEnabled: false,
  })
  const selection = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
  })

  toolLayer.add(tr); toolLayer.add(selection)

  tr.on('nodesChange', (v) => {
    console.log(v)
  })

  tr.on('dragend transformend', () => {
    updateStageBoundary(stage, objectsLayer, linkLayer)
  })
  tr.nodes([functionBlock])

  useResizeObserver(scrollTarget, (entries) => {
    console.log(entries)
    const entry = entries[0]
    const { width, height } = entry.contentRect
    stage.scrollTargetRect = {
      width, height,
    }
    updateStageBoundary(stage, objectsLayer, linkLayer)

    // console.log(
    //   width,
    //   height,
    //   { ...stage.getClientRect() },
    //   { ...tr.getClientRect() },
    //   tr.visible(),
    // )
    // // stage.scrollTargetRect = {
    // //   width,
    // //   height,
    // // }
  })

  let x1; let y1; let x2; let
    y2

  stage.on('mousedown touchstart', (e) => {
    console.log(tr.getClientRect())
    const target = e.target.findAncestor('Group', false, stage) || e.target
    if (target === stage) {
      const { x, y } = stage.getRelativePointerPosition()
      x1 = x; x2 = x
      y1 = y; y2 = y
      selection.setAttrs({
        visible: true,
        width: 0,
        height: 0,
        x,
        y,
      })
    } else if (tr.nodes().includes(target)) {
      // do nothing
    } else if (objectsLayer.getChildren().includes(target)) {
      tr.nodes([target])
    }
  })

  stage.on('mousemove touchmove', () => {
    if (!selection.visible()) return
    const { x, y } = stage.getRelativePointerPosition()
    x2 = x; y2 = y

    selection.setAttrs({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    })
  })

  stage.on('mouseup touchend', (e) => {
    if (selection.visible()) {
      const shapes = objectsLayer.getChildren()
      const box = selection.getClientRect()
      const s = shapes.filter(
        (shape) => Konva.Util.haveIntersection(box, shape.getClientRect()),
      )
      tr.nodes(s)
    } else if (e.target === stage) {
      if (!Konva.DD.justDragged) {
        tr.nodes([])
        console.log('update')
        updateStageBoundary()
      }
    }
    selection.visible(false)
  })

  return {
    stage, objectsLayer, linkLayer,
  }
  // const toolLayer = new Layer()
  // const tr = new Transformer({
  //   // boundBoxFunc(oldBox, newBox) {
  //   //   console.log(oldBox, newBox)
  //   //   if (oldBox.x < 0) {
  //   //     return {
  //   //       ...oldBox,
  //   //       x: 0,
  //   //     }
  //   //   }
  //   //   return newBox
  //   // },
  // })
  // const selection = new Rect({
  //   fill: 'rgba(0,0,255,0.5)',
  //   visible: false,
  // })
  // const sss = new Selection()
  // toolLayer.add(tr)
  // toolLayer.add(selection)
  // stage.add(toolLayer)
  // console.log(stage)
  // tr.on('dragend transformend', () => {
  //   updateStageBoundary(stage, objectsLayer, linkLayer)
  // })

  // let x1; let y1; let x2; let
  //   y2

  // stage.on('mousedown touchstart', (e) => {
  //   const target = e.target.findAncestor('Group', false, stage) || e.target
  //   if (target === stage) {
  //     const { x, y } = stage.getRelativePointerPosition()
  //     x1 = x; x2 = x
  //     y1 = y; y2 = y
  //     selection.setAttrs({
  //       visible: true,
  //       width: 0,
  //       height: 0,
  //       x,
  //       y,
  //     })
  //   } else if (tr.nodes().includes(target)) {
  //     // do nothing
  //   } else if (objectsLayer.getChildren().includes(target)) {
  //     tr.nodes([target])
  //   }
  // })

  // stage.on('mousemove touchmove', () => {
  //   if (!selection.visible()) return
  //   const { x, y } = stage.getRelativePointerPosition()
  //   x2 = x; y2 = y

  //   selection.setAttrs({
  //     x: Math.min(x1, x2),
  //     y: Math.min(y1, y2),
  //     width: Math.abs(x2 - x1),
  //     height: Math.abs(y2 - y1),
  //   })
  // })

  // stage.on('mouseup touchend', (e) => {
  //   if (selection.visible()) {
  //     const shapes = objectsLayer.getChildren()
  //     const box = selection.getClientRect()
  //     const s = shapes.filter(
  //       (shape) => Util.haveIntersection(box, shape.getClientRect()),
  //     )
  //     tr.nodes(s)
  //   } else if (e.target === stage) {
  //     if (!DD.justDragged) tr.nodes([])
  //   }

  //   selection.visible(false)
  // })
}
