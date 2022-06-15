/* eslint-disable @typescript-eslint/no-unused-vars */
import Konva from 'konva'
import hotkeys from 'hotkeys-js'
import { useResizeObserver } from '@vueuse/core'

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
  }, 'right-middle')
  // const anchor2 = new Konva.Anchor({
  //   id: '2',
  //   x: 40,
  //   y: 40,
  //   draggable: true,

  // })
  const functionBlock = new Konva.FunctionBlock({
    id: '4',
    x: 60,
    y: 60,
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
  // objectsLayer.add(anchor2)
  objectsLayer.add(functionBlock)
  objectsLayer.add(itext)
  objectsLayer.add(test)

  // then links
  Array.from({ length: 10 }).forEach((e, i) => {
    const link = new Konva.Link({
      id: '3',
      from: '1',
      to: `inputEvents${i}`,
    }, stage)
    linkLayer.add(link)
  })

  const tr = new Konva.Transformer({
    rotateEnabled: false,
  })
  const selection = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    visible: false,
  })

  toolLayer.add(tr); toolLayer.add(selection)

  const updateStageBoundary = () => {
    if (tr.nodes().length === 0) {
      tr.visible(false)
    }

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
    linkLayer.getChildren().forEach((e) => e._updatePoints())

    tr.visible(true)
  }

  tr.on('dragend transformend', () => {
    updateStageBoundary()
  })

  const container = stage.container()

  hotkeys('del', { element: container }, () => {
    if (tr.nodes().length > 0) {
      tr.nodes().forEach((e) => e.remove())
      tr.nodes([])
    }
  })
  // container.on('')

  useResizeObserver(scrollTarget, (entries) => {
    const entry = entries[0]
    const { width, height } = entry.contentRect
    stage.scrollTargetRect = {
      width, height,
    }
    updateStageBoundary()
  })

  let x1; let y1; let startWinX; let startWinY

  stage.on('mousedown', (e) => {
    const target = e.target.findAncestor('Group', false, stage) || e.target
    if (target === stage) {
      const { x: startX, y: startY } = stage.getRelativePointerPosition()
      const { x, y } = e.evt
      startWinX = x; startWinY = y
      x1 = startX; y1 = startY
      selection.setAttrs({
        visible: true,
        width: 0,
        height: 0,
        x: startX,
        y: startY,
      })
    } else if (tr.nodes().includes(target)) {
      // do nothing
    } else if (objectsLayer.getChildren().includes(target)) {
      tr.nodes([target])
    }
  })

  window.addEventListener('mousemove', (e) => {
    if (!selection.visible()) return
    const offsetX = e.x - startWinX; const offsetY = e.y - startWinY
    selection.setAttrs({
      x: Math.min(x1, x1 + offsetX),
      y: Math.min(y1, y1 + offsetY),
      width: Math.abs(offsetX),
      height: Math.abs(offsetY),
    })
  })

  window.addEventListener('mouseup', () => {
    if (selection.visible()) {
      const shapes = objectsLayer.getChildren()
      const box = selection.getClientRect()
      const s = shapes.filter(
        (shape) => Konva.Util.haveIntersection(box, shape.getClientRect()),
      )
      tr.nodes(s)
    }
    selection.visible(false)
  })

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
  //       (shape) => Konva.Util.haveIntersection(box, shape.getClientRect()),
  //     )
  //     tr.nodes(s)
  //   } else if (e.target === stage) {
  //     if (!Konva.DD.justDragged) {
  //       tr.nodes([])
  //       console.log('update')
  //       // updateStageBoundary()
  //     }
  //   }
  //   selection.visible(false)
  // })

  return {
    stage, objectsLayer, linkLayer,
  }
}
